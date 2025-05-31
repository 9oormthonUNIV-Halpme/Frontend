import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PostItem = ({ postId, title, date, startTime, endTime, nickname, createdAgo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <ItemWrapper onClick={handleClick}>
      <Title>{title}</Title>
      <SubInfo>
        <div>{formatDate(date)}</div>
        <div>{formatTime(startTime)} ~ {formatTime(endTime)}</div>
      </SubInfo>
      <Footer>
        <Nickname>{nickname}</Nickname>
        <TimeAgo>{createdAgo}</TimeAgo>
      </Footer>
    </ItemWrapper>
  );
};

export default PostItem;

// ===== 날짜/시간 포맷 함수 =====
const formatDate = (isoString) => {
  const d = new Date(isoString);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
};

const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hour, minute] = timeString.split(':').map(Number);
  const isPM = hour >= 12;
  const formattedHour = isPM ? hour - 12 || 12 : hour;
  return `오${isPM ? '후' : '전'} ${formattedHour}:${minute.toString().padStart(2, '0')}`;
};

// ===== styled-components =====
const ItemWrapper = styled.div`
  width: 100%;
   max-width: 1000px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 16px;
  text-align: left;
  cursor: pointer;
`;


const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const SubInfo = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #999;
`;

const Nickname = styled.div``;
const TimeAgo = styled.div``;
