import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { WebSocketContext } from "../context/WebSocketContext";
import axios from "axios";
import styled from "styled-components";

import ChatLayout from "../components/ChatLayout";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

import backIcon from "./../assets/BackIcon.png";
//import WebSocketDebugger from "../components/WebSocketDebugger"; // 디버깅용

const Chat = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const { chatroomId } = useParams();
  const currentUser = user?.nickname;

  const [opponentUser, setOpponentUser] = useState("");
  const [isRequester, setIsRequester] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCameraMenu, setShowCameraMenu] = useState(false);
  
  const cameraButtonRef = useRef(null);
  const menuRef = useRef(null);
  const inputCameraRef = useRef(null);
  const inputGalleryRef = useRef(null);

  const { sendMessage, subscribe, markAtRead } = useContext(WebSocketContext);
  
  const chatBodyRef = useRef(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleApply = async () => {
    if(!token || !chatroomId) return;
    if(isApplied) return;
    setLoading(true);

    try {
      console.log("dddddddddddddddddddddd")
      const postIdRes = await axios.get(
        `https://halpme.site/api/v1/chatRoom/${chatroomId}/post`,
        {
          headers: { Authorization: `Bearer ${token}`},
          params: { chatroomId: chatroomId },
        }
      );
      const postId = postIdRes.data.data.postId;
      console.log("포스트 아이디: ", postId);

      const applyRes = await axios.post(
        `https://halpme.site/api/v1/posts/${postId}/participate`,
        {},
        {
          headers: { Authorization: `Bearer ${token}`},
          params: { postId: postId },
        },
      );
      console.log("신청 반환 값: ", applyRes);

      setIsApplied(true);
    }
    catch (err) {
      console.log("신청버튼 오류: ", err);
    }
    finally {
      setLoading(false);
    }
  };

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto"; // 높이 초기화
    el.style.height = el.value === "" ? "48px" : el.scrollHeight + "px"; // 빈 문자열일 경우 최소높이(48px), 아닐 경우 내용 길이에 맞게 조절
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const toggleCameraMenu = () => {
    setShowCameraMenu((prev) => !prev);
  };

  const closeCameraMenu = () => {
    setShowCameraMenu(false);
  };

  const uploadImgFilesToS3 = async (files) => {
    if(files.length === 0) return;
    
    // 파일 개수 제한
    const formData = new FormData();
    files.slice(0, 2).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "https://halpme.site/api/v1/s3/upload",
        formData, 
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          },
        }
      );
      console.log("S3 업로드 성공1: ", response.data.data);

      return response.data.data;
    }
    catch (error) {
      console.error("S3 업로드 실패: ", error);
      throw error;
    }
  };

  const onFileSelected = async (event) => {
    const files = Array.from(event.target.files); // 이미지 파일 배열
    //console.log("선택된 파일들:", files);
    if(files.length === 0) return;

    try {
      const result = await uploadImgFilesToS3(files);
      //const imgUrls = result.data?.slice(0, 2);
      // console.log("반환된 파일 정보: ", imgUrls;

      if(result && result.length > 0){
        //const imageUrls = imageUrls.map((url) => url.split("/").pop());
        console.log("파일명만 추출: ", result);
        sendMessage({
          roomId: chatroomId,
          message: "",
          messageType: "IMAGE",
          imageUrls: result,
        });
      }
      else {
        console.warn("업로드 성공했으나, imageUrls가 비어 있음");
      }
      
    } 
    catch (e) {
      alert("파일 업로드 실패!");
    }
    finally {
      closeCameraMenu();
    }
  };

  const handlePhotoShoot = () => {
    console.log("사진 촬영하기 클릭");
    inputCameraRef.current.click();
  };

  const handleImgPick = () => {
    console.log("이미지 선택하기 클릭");
    inputGalleryRef.current.click();
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

    fetchOpponentAndChat();
  }, [chatroomId, token]);

  // 카메라 메뉴 외 클릭시 메뉴 클로징
  useEffect(() => {
    const handleClickOutside = (event) =>{
      if(
        cameraButtonRef.current &&
        !cameraButtonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ){
        console.log("클로징카메라메뉴");
        closeCameraMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  useEffect(() => {
    // 구독 콜백
    const unsub = subscribe(
      chatroomId,
      (incoming) => {
         console.log("📩 수신 메시지 구조:", incoming);
        setChatMessages((prev) => [...prev, incoming]);
        // 메시지가 렌더링되면 읽음 처리
        markAtRead(chatroomId); 
      },
      // 읽음 상태 업데이트 필요 시
       (readInfo) => {
    // ✅ 상대방이 읽은 메시지 ID 목록이 올 경우
    setChatMessages((prevMessages) =>
      prevMessages.map((msg) =>
        readInfo.readMessageIds.includes(msg.id)
          ? { ...msg, readStatus: true } // ← 상태 업데이트!
          : msg
      )
    );
  }
    );

    return () => unsub?.();
  }, [subscribe, chatroomId, markAtRead]);

  useEffect(() => {
    const handle = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    return () => window.cancelAnimationFrame(handle);
  }, [chatMessages]);
  
  useEffect(() => {
    if (!loading && chatMessages.length > 0) {
      scrollToBottom();
    }
  }, [loading]);

  return (
    <ChatLayout>
       {/*디버깅용 <WebSocketDebugger /> */}
      <ChatHeader>
        <BackButton onClick={handleBack}>
          <img src={backIcon} alt="back"/>
        </BackButton>

        <NicknameText>{opponentUser}</NicknameText>

        {isRequester 
          ? (<ApplyButton onClick={handleApply} disabled={isApplied || loading}>
              {isApplied ? "신청 완료" : (loading ? "신청 중..." : "신청")}
            </ApplyButton>) 
          : null
        }
        
      </ChatHeader>

      <ChatBody ref={chatBodyRef}>
        {loading 
          ? (<p>불러오는 중...</p>) 
          : error 
            ? (<p>{error}</p>) 
            : (<ChatMessageList 
                  messages={chatMessages} 
                  currentUser={currentUser}
                  opponentUser={opponentUser}
                  chatroomId={chatroomId}
              />)
        }
      </ChatBody>

      <ChatInput
        text={text}
        textareaRef={textareaRef}
        showCameraMenu={showCameraMenu}
        cameraButtonRef={cameraButtonRef}
        menuRef={menuRef}
        inputCameraRef={inputCameraRef}
        inputGalleryRef={inputGalleryRef}
        handleChange={handleChange}
        toggleCameraMenu={toggleCameraMenu}
        onFileSelected={onFileSelected}
        handlePhotoShoot={handlePhotoShoot}
        handleImgPick={handleImgPick}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
      />
    </ChatLayout>
  );
};

export default Chat;

const ChatHeader = styled.div`
  border: none;
  width: 100%;
  height: 50px;
  margin-top: 44px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BackButton = styled.button`
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    padding 0;
    margin-left: 8px;
    cursor: pointer;

    img {
        width: 6px;
        height: 12px;
    }
`;

const NicknameText = styled.div`
    flex: 1;
    border: none;
    padding: 0px 8px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    color: #000000;
`;

const ApplyButton = styled.button`
  width: 90px;
  height: 30px;
  margin-right: 8px;
  border-radius: 20px; 
  border: 1px solid #3EC6B4;
  background-color: ${(props) => (props.applied ? "#3EC6B4" : "white")};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.applied ? "white" : "#3EC6B4")};
`;

const ChatBody = styled.div`
  border: none;
  flex: 1;
  width: 100%;
  background-color: #F5F5F5;

  overflow-y: auto;

  /* 부모 높이 보장 위해 min-height 추가 */
  min-height: 200px;

  /* 또는 고정 높이 예시 (필요 시) */
  /* height: calc(100vh - 120px); */

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;



const CameraButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CameraButton = styled.button`
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    padding 0;
    margin-left: 8px;
    cursor: pointer;

    img {
        width: 22px;
        height: 18px;
    }
`;

const InputForm = styled.textarea`
    flex: 1;
    height: 48px;
    max-height: 120px;
    border: none;
    background-color: #F5F5F5;
    padding: 8px;
    font-size: 20px;
    text-align: left;
    font-family: 'Noto Sans KR', 'Inter', 'Roboto', sans-serif;
    color: #000000;
    border-radius: 4px; 
    box-sizing: border-box;
    resize: none;
    line-height: 32px;
    overflow-y: hidden;

    &::placeholder {
    color: #888888;
  }

  outline: none;
`;

const SendButton = styled.button`
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    padding 0;
    margin-left: 8px;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
    }
`;

