import React, { useEffect, useState, useContext } from 'react';
import { useParticipation } from "../context/ParticipationContext";
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar';
import HistoryItem from '../components/HistoryItem';

const HelpHistoryPage = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
const { isParticipated } = useParticipation();
 useEffect(() => {
  axios.get('https://halpme.site/api/v1/posts/my-request', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then((res) => {
    console.log('📦 전체 응답:', res.data.data);

    const list = res.data.data.map(item => {
      const status = item.postStatus ?? (isParticipated(item.postId) ? 'AUTHENTICATED' : 'WAITING');
      return {
        postId: item.postId,
        title: item.title,
        date: item.requestDate,
        startTime: item.startHour,
        endTime: item.endHour,
        nickname: item.nickname,
        postStatus: status,
      };
    });

    setData(list);
  })
  .catch(err => {
    console.error(err);
  });
}, [token, isParticipated]); // ✅ 여기가 useEffect 끝


  const handleStatusChange = async (postId, currentStatus) => {
  if (currentStatus === 'AUTHENTICATED') {
    try {
      await axios.post(
        `https://halpme.site/api/v1/posts/${postId}/authenticate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData(prev =>
        prev.map(item =>
          item.postId === postId
            ? { ...item, postStatus: 'COMPLETED' }
            : item
        )
      );
    } catch (err) {
      console.error('인증 실패:', err);
    }
  }
};


  return (
    <MobileLayout>
      <Wrapper>
        <Header>
          <BackIcon onClick={() => navigate(-1)}>
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.89258 13.3027L1.89258 7.30273L7.89258 1.30273" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BackIcon>
          <TitleText>도움요청 내역</TitleText>
        </Header>
        <List>
          {data.map(post => {
            console.log('🧾 postStatus:', post.postStatus); // ✅ 중괄호로 감싸면 정상 작동
            return (
              <HistoryItem
                key={post.postId}
                title={post.title}
                date={post.date}
                startTime={post.startTime}
                endTime={post.endTime}
                postStatus={post.postStatus}
                postId={post.postId}
                viewerType="requester"
                onStatusChange={handleStatusChange}
              />

            );
          })}
        </List>
      </Wrapper>
      <BottomNavigationBar />
    </MobileLayout>
  );
};

export default HelpHistoryPage;

const getNextStatus = (current) => {
  switch (current) {
    case 'REQUESTED': return 'IN_PROGRESS';
    case 'IN_PROGRESS': return 'AUTHENTICATED';
    case 'AUTHENTICATED': return 'AUTHENTICATED';
    default: return 'REQUESTED';
  }
};

// ===== styled-components =====
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 16px 12px 80px 12px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 6px;
    height: 12px;
  }
`;

const TitleText = styled.h2`
  font-size: 22px;
  font-weight: bold;
  text-align: left;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BackIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

