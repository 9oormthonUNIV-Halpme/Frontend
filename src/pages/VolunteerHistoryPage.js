import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useParticipation } from '../context/ParticipationContext'; // ✅ 추가
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar';
import HistoryItem from '../components/HistoryItem';

const VolunteerHistoryPage = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
const { isParticipated, addPostId } = useParticipation();  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://halpme.site/api/v1/posts/my-volunteer', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const list = res.data.data.map(item => {
        const status = item.postStatus ?? (isParticipated(item.postId) ? 'AUTHENTICATED' : 'WAITING');

        return {
          postId: item.postId,
          title: item.title,
          date: item.requestDate,
          startTime: item.startHour,
          endTime: item.endHour,
          nickname: item.nickname,
          postStatus: status, // ✅ 보정된 상태 사용
        };
      });

      setData(list);
    })
    .catch(err => {
      console.error(err);
    });
  }, [token, isParticipated]);

  return (
    <MobileLayout>
      <Wrapper>
        <Header>
          <BackIcon onClick={() => navigate(-1)}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.89258 13.3027L1.89258 7.30273L7.89258 1.30273" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </BackIcon>
          <TitleText>봉사참여 내역</TitleText>
        </Header>

        <List>
          {data.map(post => (
            <HistoryItem
              key={post.postId}
              postId={post.postId}
              title={post.title}
              date={post.date}
              startTime={post.startTime}
              endTime={post.endTime}
              postStatus={post.postStatus}
              viewerType="volunteer"
              onStatusChange={() => {}} // ❗ 클릭 비활성화용
            />
          ))}
        </List>
      </Wrapper>
      <BottomNavigationBar />
    </MobileLayout>
  );
};

export default VolunteerHistoryPage;

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
