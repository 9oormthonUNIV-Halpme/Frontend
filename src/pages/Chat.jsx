import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { WebSocketContext } from "../context/WebSocketContext";
import { useParticipation } from "../context/ParticipationContext";
import axios from "axios";
import styled from "styled-components";

import ChatLayout from "../components/ChatLayout";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";
import backIcon from "./../assets/BackIcon.png";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useContext(AuthContext);
  const { chatroomId } = useParams();
  const { addPostId, isParticipated } = useParticipation();
  const passedPostId = location.state?.postId;
  const currentUser = user?.nickname;

  const [opponentUser, setOpponentUser] = useState("");
  const [isRequester, setIsRequester] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");

  const textareaRef = useRef(null);
  const chatBodyRef = useRef(null);
  const cameraButtonRef = useRef(null);
  const menuRef = useRef(null);
  const inputCameraRef = useRef(null);
  const inputGalleryRef = useRef(null);

  const { sendMessage, subscribe, markAsRead } = useContext(WebSocketContext);

  const handleBack = () => navigate(-1);

  const handleApply = async () => {
    if (!token || !chatroomId || isApplied || !passedPostId) return;
    setLoading(true);

    try {
      const postIdRes = await axios.get(
        `https://halpme.site/api/v1/chatRoom/${chatroomId}/post`,
        {
          headers: { Authorization: `Bearer ${token}`},
          params: { chatroomId: chatroomId },
        }
      );
      const postId = postIdRes.data.data.postId;
      // console.log("신청 버튼 - 포스트 아이디: ", postId);

      const applyRes = await axios.post(
        `https://halpme.site/api/v1/posts/${postId}/participate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("신청 버튼 - 신청 반환 값: ", applyRes);
      if (applyRes.data.status === 201) {
        alert("봉사자가 되셨습니다.");
      }
      setIsApplied(true);
    }
    catch (err) {
      // console.log("신청버튼 오류: ", err);
      alert("이미 완료된 봉사입니다.");
      setIsApplied(true);
    }
    finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({ roomId: chatroomId, message: text.trim(), messageType: "TEXT" });
    setText("");
    textareaRef.current.style.height = "48px";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    const el = chatBodyRef.current;
    if (el) {
      // 직접 scrollTop을 scrollHeight로 설정해도 됩니다.
      el.scrollTop = el.scrollHeight;
    }
  };

  //렌더링 시 신청 여부를 ui에 적용용
  useEffect(() => {
    const checkApplyStatus = async () => {
      if(!token || !chatroomId) return;

      try {
        const postIdRes = await axios.get(
          `https://halpme.site/api/v1/chatRoom/${chatroomId}/post`,
          {
            headers: { Authorization: `Bearer ${token}`},
            params: { chatroomId: chatroomId },
          }
        );
        const targetPostId = postIdRes.data.data.postId;
        console.log("신청상태 체크 - 포스트 아이디: ", targetPostId);

        const postsRes = await axios.get(
          `https://halpme.site/api/v1/posts`,
          {
            headers: { Authorization: `Bearer ${token}`},
          }
        );
        const postList = postsRes.data.data;
        const matchedPost = postList.find(post => post.postId === targetPostId)
        
        // 아무도 신청하지 않았을 경우, null
        // 신청하고 난 뒤, AUTHENTICATED
        console.log("내가 알고 싶은 신청상태값: ", matchedPost.status);
        if(matchedPost.status === null) setIsApplied(false);
        else if(matchedPost.status === "AUTHENTICATED") setIsApplied(true);
        else if(matchedPost.status === "COMPLETED") setIsApplied(true);

      }
      catch (err) {
        console.error("신청 불가 상태: ", err);
        setIsApplied(true);
      }
    };

    checkApplyStatus();
  }, [token, chatroomId]);

  useEffect(() => {
    adjustHeight();
  }, [text]);

  useEffect(() => {
    const fetchOpponentAndChat = async () => {
      if(!token || !chatroomId) return;
      //console.log("상대정보-챗방아이디: ", chatroomId);
      if (!token || !chatroomId) {
      console.warn("chatroomId 또는 token이 없음", chatroomId, token);
      return;
    }
      setLoading(true);

      try {
        // 상대방 닉네임과 사용자 신분 API 호출
        const opponentRes = await axios.get(
          `https://halpme.site/api/v1/chatRoom/opponent-info`,
          { 
            headers: { Authorization: `Bearer ${token}` },
            params: { roomId: chatroomId },
          }
        );
        setOpponentUser(opponentRes.data.data.opponentNickname);
        setIsRequester(opponentRes.data.data.identity !== "도움요청");
        
        // 채팅 기록 API 호출
        const chatRes = await axios.get(
          `https://halpme.site/api/v1/chatRoom/messages`,
          { 
            headers: { Authorization: `Bearer ${token}` },
            params: { roomId: chatroomId },
          }
        );
        console.log("메시지 출력", chatRes.data.data);
        setChatMessages(chatRes.data.data);
        setLoading(false);
      }
      catch (err) {
        setError("채팅 메시지 요청 실패");
        setLoading(false);
      }
    };
    fetchChatInfo();
  }, [chatroomId, token]);

  useEffect(() => {
    if (passedPostId && isParticipated(passedPostId)) setIsApplied(true);
  }, [passedPostId, isParticipated]);

  useEffect(() => {
    const unsub = subscribe(
      chatroomId,
      (incoming) => {
        setChatMessages(prev => [...prev, incoming]);
        markAsRead(incoming.id);
      },
      (readInfo) => {
        setChatMessages(prev =>
          prev.map(msg => (msg.id === readInfo.lastReadId ? { ...msg, read: true } : msg))
        );
      }
    );
    return () => unsub?.();
  }, [subscribe, chatroomId, markAsRead]);

  return (
    <ChatLayout>
      <ChatHeader>
        <HeaderTopRow>
          <BackButton onClick={handleBack}>
            <img src={backIcon} alt="back" />
          </BackButton>
          <NicknameText>{opponentUser}</NicknameText>
        </HeaderTopRow>
        {isRequester && !isApplied && (
          <ApplyButton onClick={handleApply} disabled={loading}>
            {loading ? "신청 중..." : "신청"}
          </ApplyButton>
        )}
      </ChatHeader>

      <ChatBody ref={chatBodyRef}>
        {loading ? <p>불러오는 중...</p> : error ? <p>{error}</p> : (
          <ChatMessageList
            messages={chatMessages}
            currentUser={currentUser}
            opponentUser={opponentUser}
            chatroomId={chatroomId}
          />
        )}
      </ChatBody>

      <ChatInput
        text={text}
        textareaRef={textareaRef}
        handleChange={e => setText(e.target.value)}
        onSend={handleSend}
        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        showCameraMenu={false} // 필요 시 true 처리
        cameraButtonRef={cameraButtonRef}
        menuRef={menuRef}
        inputCameraRef={inputCameraRef}
        inputGalleryRef={inputGalleryRef}
        toggleCameraMenu={() => {}}
        onFileSelected={() => {}}
        handlePhotoShoot={() => {}}
        handleImgPick={() => {}}
      />
    </ChatLayout>
  );
};

export default Chat;

const ChatHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 44px;
  padding-bottom: 8px;
`;

const HeaderTopRow = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  margin-left: 8px;
  cursor: pointer;

  img {
    width: 6px;
    height: 12px;
  }
`;

const NicknameText = styled.div`
  flex: 1;
  padding: 0px 8px;
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const ApplyButton = styled.button`
  align-self: flex-end;
  margin-right: 8px;
  margin-top: 4px;
  width: 90px;
  height: 30px;
  border-radius: 20px;
  border: 1px solid #3EC6B4;
  background-color: white;
  color: #3EC6B4;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ChatBody = styled.div`
  flex: 1;
  width: 100%;
  background-color: #F5F5F5;
  overflow-y: auto;
  min-height: 200px;
  &::-webkit-scrollbar { width: 0; background: transparent; }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
