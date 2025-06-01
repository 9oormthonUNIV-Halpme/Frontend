import React from 'react';
import styled from 'styled-components';
import { formatHourMinute } from '../utils/timeFormat';
import { formatDate } from '../utils/dateFormat';

const HistoryItem = ({ title, date, startTime, endTime, postStatus, onStatusChange, postId, viewerType = 'requester' }) => {
  const statusLabelMap = {
    requester: {
      WAITING: '대기 중',
      AUTHENTICATED: '인증하기',
      COMPLETED: '완료',
    },
    volunteer: {
      AUTHENTICATED: '진행 중',
      COMPLETED: '인증 완료',
    },
  };

  const label = statusLabelMap[viewerType]?.[postStatus];

  const handleStatusClick = () => {
    if (viewerType === 'requester' && postStatus === 'AUTHENTICATED') {
      onStatusChange?.(postId, postStatus);
    }
  };

   return (
    <ItemWrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <DateText>
          {formatDate(date)} {formatHourMinute(startTime)} ~ {formatHourMinute(endTime)}
        </DateText>
      </TextWrapper>
      {label && (
        <StatusButton status={postStatus} disabled={viewerType === 'volunteer'}>
          {label}
        </StatusButton>
      )}
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
  width: 60px;
  height: 25px;
  border-radius: 6px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  gap: 10px;
  border: none;
  cursor: pointer;

  ${({ status }) => {
    switch (status) {
      case 'WAITING':
        return `
          background-color: #E6F4F1;
          color: #3AAFA9;
        `;
      case 'AUTHENTICATED':
        return `
          background-color: #3AAFA9;
          color: white;
        `;
      case 'COMPLETED':
        return `
          background-color: #E6F4F1;
          color: #3AAFA9;
          border: 1px solid #3AAFA9;
        `;
      default:
        return `
          background-color: #ccc;
          color: white;
        `;
    }
  }}
`;
