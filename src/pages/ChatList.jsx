import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MobileLayout from "../components/MobileLayout";
import ChatFilter from "../components/ChatFilter";
import ChatItem from "../components/ChatItem";
import BottomNavigationBar from "../components/BottomNavigationBar";

const mockChatRooms = [
    {
      "roomId": "eac6fb1d-f02f-4a11-83b4-ff3be3223591",
      "participants": ["dngus7208@naver.com", "dngus7207@naver.com"],
      "lastMessage": {
        "id": 4,
        "roomId": "eac6fb1d-f02f-4a11-83b4-ff3be3223591",
        "sender": "dngus7207@naver.com",
        "message": "테스트메시지1",
        "createdAt": "2025-05-25T06:01:33.440476"
      },
      "unreadCount": 2,
      "type": "도움요청"
    },
    {
      "roomId": "f445d094-fffb-47e7-bb72-d92e8e7697e1",
      "participants": ["dngus7208@naver.com", "dngus7206@naver.com"],
      "lastMessage": {
        "id": 6,
        "roomId": "f445d094-fffb-47e7-bb72-d92e8e7697e1",
        "sender": "dngus7206@naver.com",
        "message": "테스트메시지2",
        "createdAt": "2025-05-24T17:08:47.777480"
      },
      "unreadCount": 3,
      "type": "봉사참여"
    },
    {
      "roomId": "a1dca1c6-ef3b-4ae0-9a85-1b4f7cd10d1a",
      "participants": ["dngus7208@naver.com", "test1@example.com"],
      "lastMessage": {
        "id": 7,
        "roomId": "a1dca1c6-ef3b-4ae0-9a85-1b4f7cd10d1a",
        "sender": "test1@example.com",
        "message": "안녕하세요!",
        "createdAt": "2025-05-24T17:10:11.123456"
      },
      "unreadCount": 0,
      "type": "봉사참여"
    },
    {
      "roomId": "bb5c7920-2450-4115-b9d7-90cfcd6f94fc",
      "participants": ["dngus7208@naver.com", "helper@example.com"],
      "lastMessage": {
        "id": 8,
        "roomId": "bb5c7920-2450-4115-b9d7-90cfcd6f94fc",
        "sender": "dngus7208@naver.com",
        "message": "도움 요청드립니다.",
        "createdAt": "2025-05-24T17:12:30.000000"
      },
      "unreadCount": 1,
      "type": "도움요청"
    },
    {
      "roomId": "c9d50f2c-2b98-4b8a-b273-1d508a27f391",
      "participants": ["dngus7208@naver.com", "user2@example.com"],
      "lastMessage": {
        "id": 9,
        "roomId": "c9d50f2c-2b98-4b8a-b273-1d508a27f391",
        "sender": "user2@example.com",
        "message": "지금 통화 가능하신가요?",
        "createdAt": "2025-05-24T17:13:50.000000"
      },
      "unreadCount": 5,
      "type": "봉사참여"
    },
    {
      "roomId": "de3dbf30-d7ef-4d33-a17d-df5cc0f147c5",
      "participants": ["dngus7208@naver.com", "admin@example.com"],
      "lastMessage": {
        "id": 10,
        "roomId": "de3dbf30-d7ef-4d33-a17d-df5cc0f147c5",
        "sender": "admin@example.com",
        "message": "공지사항을 확인해주세요.",
        "createdAt": "2025-05-24T17:15:00.000000"
      },
      "unreadCount": 0,
      "type": "도움요청"
    },
    {
      "roomId": "f7bb858d-e4e4-49a2-b41f-cd82b8a11a1c",
      "participants": ["dngus7208@naver.com", "dngus7205@naver.com"],
      "lastMessage": {
        "id": 11,
        "roomId": "f7bb858d-e4e4-49a2-b41f-cd82b8a11a1c",
        "sender": "dngus7205@naver.com",
        "message": "오랜만이네요!",
        "createdAt": "2025-05-24T17:16:20.000000"
      },
      "unreadCount": 2,
      "type": "도움요청"
    },
    {
      "roomId": "a234f2ef-39fd-4bcf-8208-7f616bfa6e56",
      "participants": ["dngus7208@naver.com", "guest@example.com"],
      "lastMessage": {
        "id": 12,
        "roomId": "a234f2ef-39fd-4bcf-8208-7f616bfa6e56",
        "sender": "guest@example.com",
        "message": "파일 첨부했습니다.",
        "createdAt": "2025-05-24T17:18:00.000000"
      },
      "unreadCount": 1,
      "type": "봉사참여"
    },
    {
      "roomId": "9a1d911d-27f7-4173-b8c6-d108469ff177",
      "participants": ["dngus7208@naver.com", "dngus7204@naver.com"],
      "lastMessage": {
        "id": 13,
        "roomId": "9a1d911d-27f7-4173-b8c6-d108469ff177",
        "sender": "dngus7204@naver.com",
        "message": "답변이 늦었습니다.",
        "createdAt": "2025-05-24T17:20:00.000000"
      },
      "unreadCount": 4,
      "type": "봉사참여"
    },
    {
      "roomId": "71f1a059-bb19-4a35-9143-cd26ce90df9f",
      "participants": ["dngus7208@naver.com", "developer@example.com"],
      "lastMessage": {
        "id": 14,
        "roomId": "71f1a059-bb19-4a35-9143-cd26ce90df9f",
        "sender": "developer@example.com",
        "message": "버그 수정 완료했습니다.",
        "createdAt": "2025-05-24T17:22:00.000000"
      },
      "unreadCount": 0,
      "type": "도움요청"
    }
];

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [filter, setFilter] = useState('전체');

  useEffect(() => {
    setChats(mockChatRooms);
  }, []);

  const filteredChats = chats.filter(chat => {
    if (filter === '전체') return true;
    return chat.type === filter;
  });

  return (
    <MobileLayout>
        <ChatListTitle>
          <p>채팅</p>
        </ChatListTitle>

        <ChatFilter current={filter} setFilter={setFilter} />
        
        <ChatListContainer>
          {filteredChats.map(chat => (
            <ChatItem key={chat.roomId} item={chat} />
          ))}
        </ChatListContainer>
        
        <BottomNavigationBar />    
    </MobileLayout>
  );
};

export default ChatList;

const ChatListContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 580px;
  overflow-y: auto;
  padding: 0 12px;
  padding-bottom: 80px;
`;

const ChatListTitle = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 44px;
  display: flex;
  align-items: center;
  text-align: left;

  p {
    font-size: 24px;
    font-weight: bold;
    margin-left: 8px; 
  }
`;