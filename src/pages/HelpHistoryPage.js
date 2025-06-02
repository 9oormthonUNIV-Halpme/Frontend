import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar';
import HistoryItem from '../components/HistoryItem';
import Modal from '../components/Modal';

const HelpHistoryPage = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMessage, setModalMessage] = useState('');


  useEffect(() => {
    axios.get('https://halpme.site/api/v1/posts/my-request', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log('📦 전체 응답:', res.data.data);

      const list = res.data.data.map(item => {
        // postStatus가 null이면 WAITING 처리
        const status = item.postStatus ?? 'WAITING';
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

         // ✅ 모달 띄우기
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
          <BackIcon onClick={() => navigate(-1)}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.89258 13.3027L1.89258 7.30273L7.89258 1.30273" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </BackIcon>
          <TitleText>도움요청 내역</TitleText>
        </Header>
        <List>
          {data.map(post => (
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
          ))}
        </List>
      </Wrapper>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
      <BottomNavigationBar />
    </MobileLayout>
  );
};

export default HelpHistoryPage;

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

