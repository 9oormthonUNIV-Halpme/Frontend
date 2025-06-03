import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import profileImg from "./../assets/HalpmeLogo.svg";

export default function ChatItem({ item }) {
  const navigate = useNavigate();
  const { lastMessage, unreadCount } = item;
  const nickname = item.opponentNickname || '상대방';

  const formatTime = (isoString) => {
    const messageDate = new Date(isoString);
    const now = new Date();

    const isToday = messageDate.toDateString() === now.toDateString();

    if (isToday) {
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      const period = hours >= 12 ? '오후' : '오전';
      const formattedHour = hours % 12 || 12;
      return `${period} ${formattedHour}:${minutes}`;
    } else {
      const month = messageDate.getMonth() + 1;
      const date = messageDate.getDate();
      return `${month}월 ${date}일`;
    }
  };

  const handleClick = () => {
    navigate(`/chat/${item.roomId}`);
  };
  return (
    <ChatItemContainer onClick={handleClick} >
      <ProfileImage src={profileImg} alt="프로필" />
      <ChatContent>
        <TopRow>
          <Nickname>{nickname}</Nickname>
          <Time>{formatTime(lastMessage?.createdAt)}</Time>
        </TopRow>
        <LastMessage>{lastMessage?.message || '메시지 없음'}</LastMessage>
      </ChatContent>
      {unreadCount > 0 && <UnreadBadge>+{unreadCount}</UnreadBadge>}
    </ChatItemContainer>
  );
}

const ChatItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-right: 7px;
`;

const Time = styled.div`
  font-size: 14px;
  color: #888888;
`;

const LastMessage = styled.div`
  max-width: 200px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 14px;
  color: #666;
  display: flex; 
  align-items: flex-start;
  text-align: left;
  color: #888888;
`;

const UnreadBadge = styled.div`
  position: absolute;
  right: 16px;
  bottom: 12px;
  background-color: #F5F5F5;
  color: black;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 12px;
`;
