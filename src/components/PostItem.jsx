import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { formatHourMinute } from '../utils/timeFormat';
import { formatDate } from '../utils/dateFormat';


const PostItem = ({
  postId,
  title,
  date,
  startTime,
  endTime,
  nickname,
  createdAgo,
  postStatus,
  onStatusChange,
  isHistory = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isHistory) navigate(`/post/${postId}`);
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();
    onStatusChange?.(postId);
  };

  const statusLabel = {
    REQUESTED: '대기 중',
    IN_PROGRESS: '진행중',
    WAITING: '인증하기',
    AUTHENTICATED: '완료',
    COMPLETED: '완료'
  }[postStatus];

  return (
    <ItemWrapper onClick={handleClick} $clickable={!isHistory}>
      <LeftInfo>
        <Title>{title}</Title>
        <Date>{formatDate(date)} <br/>{formatHourMinute(startTime)} ~ {formatHourMinute(endTime)}</Date>
        {!isHistory && <Nickname>{nickname}</Nickname>}
      </LeftInfo>
      {isHistory && (
        <StatusButton status={postStatus} onClick={handleStatusClick}>
          {statusLabel}
        </StatusButton>
      )}
      {!isHistory && <TimeAgo>{createdAgo}</TimeAgo>}
    </ItemWrapper>
  );
};

export default PostItem;

// 스타일
const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 4px;
  border-bottom: 1px solid #eee;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const Date = styled.div`
  font-size: 16px;
  color: #000;
  font-weight: 500;
`;

const Nickname = styled.div`
  font-size: 12px;
  color: #888;
`;

const TimeAgo = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-left: auto;
`;

const StatusButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 12px;
  border: none;
  margin-left: auto;
  white-space: nowrap;
  background-color: ${({ status }) =>
    status === 'AUTHENTICATED' || status === 'COMPLETED'
      ? '#ccc'
      : status === 'IN_PROGRESS'
      ? '#ffcc80'
      : '#3EC6B4'};
  color: ${({ status }) =>
    status === 'AUTHENTICATED' || status === 'COMPLETED'
      ? '#000'
      : '#fff'};
`;
