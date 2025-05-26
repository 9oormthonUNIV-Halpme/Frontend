import React from 'react';
import styled from 'styled-components';

const HistoryList = ({ data, type }) => {
  const getStatusStyle = (status) => {
    if (status === '진행 중') return { backgroundColor: '#00C7AE', color: '#fff' };
    if (status === '완료') return { backgroundColor: '#EAEAEA', color: '#000' };
    return {};
  };

  return (
    <ListWrapper>
      {data.map((item) => (
        <Item key={item.postId}>
          <TextGroup>
            <Title>{item.title}</Title>
            <Detail>{item.date}</Detail>
            <Detail>{item.time}</Detail>
            <Detail>닉네임</Detail>
          </TextGroup>
          <StatusBadge style={getStatusStyle(item.status)}>
            {item.status}
          </StatusBadge>
        </Item>
      ))}
    </ListWrapper>
  );
};

export default HistoryList;

// 스타일
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Detail = styled.div`
  font-size: 12px;
  color: #666;
`;

const StatusBadge = styled.div`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
`;
