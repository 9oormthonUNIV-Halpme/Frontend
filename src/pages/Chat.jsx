import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import ChatLayout from "../components/ChatLayout";
import ChatMessageList from "../components/ChatMessageList";

import backIcon from "./../assets/BackIcon.png";
import cameraIcon from "./../assets/CameraIcon.png";
import sendIcon from "./../assets/SendIcon.png";

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

  return (
    <ChatLayout>
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

      <ChatInput>
        <CameraButton>
          <img src={cameraIcon} alt="camera"/>
        </CameraButton>

        <InputForm 
          ref={textareaRef}
          value={text}
          placeholder="메시지를 입력하세요." 
          onChange={handleChange}
          rows={1}
        />

        <SendButton>
          <img src={sendIcon} alt="send"/>
        </SendButton>
      </ChatInput>
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

const ChatInput = styled.div`
  border: none;
  width: 100%;
  min-height: 64px;
  box-sizing: border-box;
  padding: 8px 0px;
  display: flex;
  align-items: flex-end;
  justify-content: cener;
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

