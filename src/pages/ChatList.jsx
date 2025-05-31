import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import styled from "styled-components";
import axios from "axios";
import MobileLayout from "../components/MobileLayout";
import ChatFilter from "../components/ChatFilter";
import ChatItem from "../components/ChatItem";
import BottomNavigationBar from "../components/BottomNavigationBar";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [filter, setFilter] = useState('전체');
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatList = async () => {
      setLoading(true);
      try {
        const chatListRes = await axios.get(
          `https://halpme.site/api/v1/chatRoom/rooms`,
          { 
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChats(chatListRes.data.data);
        //console.log("채팅 목록: ", chatListRes.data.data);
      }
      catch (err) {
        setError("채팅 목록 요청 실패");
        setLoading(false);
      }
    };

    fetchChatList();
  }, [token]);

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