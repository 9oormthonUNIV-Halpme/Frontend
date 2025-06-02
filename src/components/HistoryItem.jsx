import React from 'react';
import styled from 'styled-components';
import { formatHourMinute } from '../utils/timeFormat';
import { formatDate } from '../utils/dateFormat';

const HistoryItem = ({ title, date, startTime, endTime, postStatus, onStatusChange, postId }) => {
  const handleStatusClick = () => {
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
    <ItemWrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <DateText>{formatDate(date)} {formatHourMinute(startTime)} ~ {formatHourMinute(endTime)}</DateText>
      </TextWrapper>
      <StatusButton status={postStatus} onClick={handleStatusClick}>
        {statusLabel}
      </StatusButton>
    </ItemWrapper>
  );
};

export default HistoryItem;


// 스타일
const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #000;
  text-align: left;
`;

const DateText = styled.div`
  font-size: 13px;
  color: #555;
  text-align: left;
`;

const StatusButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 12px;
  border: none;
  white-space: nowrap;
  margin-left: 12px;

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
