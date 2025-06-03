import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar';
import BackIcon from '../assets/BackIcon.png';
import HistoryItem from '../components/HistoryItem';

const HelpHistoryPage = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://halpme.site/api/v1/posts/my-request', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const list = res.data.data.map(item => ({
        postId: item.postId,
        title: item.title,
        date: item.requestDate,
        startTime: item.startHour,
        endTime: item.endHour,
        nickname: item.nickname,
        postStatus: item.postStatus
      }));
      setData(list);
    })
    .catch(err => {
      console.error(err);
    });
  }, [token]);

  const handleStatusChange = async (postId, currentStatus) => {
    console.log('현재 상태:', currentStatus, '포스트 ID:', postId);
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

      setModalMessage('봉사가 인증되었습니다 ✅');
      setIsModalOpen(true);
      } catch (err) {
        console.error('인증 실패:', err);
      }
    }
  };

  return (
    <MobileLayout>
      <Wrapper>
        <Header>
          <BackButton onClick={() => navigate('/my-page')}>
            <img src={BackIcon} alt="뒤로가기" />
          </BackButton>
          <TitleText>도움요청 내역</TitleText>
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
            onStatusChange={handleStatusChange}
          />
        ))}

        </List>
      </Wrapper>
      <BottomNavigationBar />
    </MobileLayout>
  );
};

export default HelpHistoryPage;


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
