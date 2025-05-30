import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { WebSocketContext } from "../context/WebSocketContext";
import axios from "axios";
import styled from "styled-components";

import ChatLayout from "../components/ChatLayout";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

import backIcon from "./../assets/BackIcon.png";
//import WebSocketDebugger from "../components/WebSocketDebugger"; // 디버깅용

const mockApiResponse = {
  status: 0,
  success: true,
  message: "string",
  data: {
    roomMakerEmail: "maker@example.com",
    guestEmail: "guest@example.com",
    chatRoomId: "room-1234"
  }
};

const mockOpponent = {
  status: 0,
  success: true,
  message: "string",
  data: {
    opponentNickname: "userB",
    identity: "봉사신청"
  }
};


const mockChat = [
  {
    "id": 1,
    "roomId": "room1",
    "sender": "테스트",
    "message": "안녕하세요!",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "false",
    "createdAt": "2025-05-29T10:00:00.000Z"
  },
  {
    "id": 2,
    "roomId": "room1",
    "sender": "userB",
    "message": "안녕하세요~ 반가워요.",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:00:10.000Z"
  },
  {
    "id": 3,
    "roomId": "room1",
    "sender": "테스트",
    "message": "혹시 자료 보셨나요?",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:01:00.000Z"
  },
  {
    "id": 4,
    "roomId": "room1",
    "sender": "userB",
    "message": "네, 방금 확인했어요.",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:01:15.000Z"
  },
  {
    "id": 5,
    "roomId": "room1",
    "sender": "userB",
    "message": "괜찮은 것 같아요!",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:01:20.000Z"
  },
  {
    "id": 6,
    "roomId": "room1",
    "sender": "테스트",
    "message": "다행이네요 😊",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:02:00.000Z"
  },
  {
    "id": 7,
    "roomId": "room1",
    "sender": "테스트",
    "message": "시간 괜찮으시면 오늘 회의 가능할까요?",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:02:30.000Z"
  },
  {
    "id": 8,
    "roomId": "room1",
    "sender": "userB",
    "message": "네 오늘 오후 3시 어때요?",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:03:00.000Z"
  },
  {
    "id": 9,
    "roomId": "room1",
    "sender": "테스트",
    "message": "좋아요. 그때 뵈어요!",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:03:30.000Z"
  },
  {
    "id": 10,
    "roomId": "room1",
    "sender": "userB",
    "message": "네~ 회의 링크 보내드릴게요.",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:04:00.000Z"
  },
  {
    "id": 11,
    "roomId": "room1",
    "sender": "userB",
    "message": "https://meet.example.com/abc123",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:04:10.000Z"
  },
  {
    "id": 12,
    "roomId": "room1",
    "sender": "테스트",
    "message": "링크 확인했습니다!",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "true",
    "createdAt": "2025-05-29T10:05:00.000Z"
  },
  {
    "id": 13,
    "roomId": "room1",
    "sender": "테스트",
    "message": "그때 뵐게요~ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "false",
    "createdAt": "2025-05-29T10:05:15.000Z"
  },
  {
    "id": 14,
    "roomId": "room1",
    "sender": "userB",
    "message": "넵 감사합니다!",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "false",
    "createdAt": "2025-05-29T10:05:30.000Z"
  },
  {
    "id": 15,
    "roomId": "room1",
    "sender": "테스트트",
    "message": "이따 뵐게요!ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    "imageUrls": [],
    "messageType": "TEXT",
    "readStatus": "false",
    "createdAt": "2025-05-29T10:06:00.000Z"
  }
];


const Chat = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const currentUser = user?.nickname;
  const opponentUser = mockOpponent.data.opponentNickname;
  const isRequester = mockOpponent.data.identity === "도움요청"
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

  const { chatRoomId: mockRoomId } = mockApiResponse.data;
  const { sendMessage, subscribe, markAsRead } = useContext(WebSocketContext);
  
  const handleBack = () => {
    navigate(-1);
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
    const token = localStorage.getItem("token");
    
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
      console.log("S3 업로드 성공: ", response.data);
      return response.data;
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
      const imageUrls = result.data?.slice(0, 2);
      //console.log("반환된 파일 정보: ", imageUrls);

      if(imageUrls && imageUrls.length > 0){
        sendMessage({
          roomId: mockRoomId,
          message: "",
          messageType: "IMAGE",
          imageUrls,
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
    sendMessage({ roomId: mockRoomId, message: text.trim(), messageType: "TEXT" });
    setText("");
    textareaRef.current.style.height = "48px";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setChatMessages(mockChat);
        setLoading(false);
      }
      catch {
        setError("메시지를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

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
      mockRoomId,
      (incoming) => {
        setChatMessages((prev) => [...prev, incoming]);
        // 메시지가 렌더링되면 읽음 처리
        markAsRead(incoming.id);
      },
      // 읽음 상태 업데이트 필요 시
      (readInfo) => {
        setChatMessages((prev) =>
          prev.map((c) => (c.id === readInfo.lastReadId ? { ...c, read: true } : c))
        );
      }
    );

    return () => unsub?.();
  }, [subscribe, mockRoomId, markAsRead]);

  return (
    <ChatLayout>
       {/*디버깅용 <WebSocketDebugger /> */}
      <ChatHeader>
        <BackButton onClick={handleBack}>
          <img src={backIcon} alt="back"/>
        </BackButton>

        <NicknameText>{opponentUser}</NicknameText>

        {isRequester ? <ApplyButton>신청</ApplyButton> : null}
        
      </ChatHeader>

      <ChatBody>
        {loading 
          ? (<p>불러오는 중...</p>) 
          : error 
            ? (<p>{error}</p>) 
            : (<ChatMessageList 
                  messages={chatMessages} 
                  currentUser={currentUser}
                  opponentUser={opponentUser}
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
  background-color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #3ec6b4;
`;

const ChatBody = styled.div`
  border: none;
  flex: 1;
  width: 100%;
  height: 500px;
  
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Optional: 스크롤바 배경 제거 */
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

