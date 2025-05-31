import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar'; // ✅ 추가

const Home = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingCategory, setRemainingCategory] = useState(1);

  useEffect(() => {
    axios.get('/api/user/score', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setScore(res.data.score);
      setRemainingCategory(res.data.remainingCategory);
    })
    .catch(err => {
      console.error(err);
    });
  }, [token]);

  return (
    <MobileLayout>
      <Container>
        <Region>개신동</Region>
        <ButtonWrapper>
          <ActionButton onClick={() => navigate('/writing')}>
            <Icon src={require('../assets/helphand.png')} alt="도움요청" />
            도움요청
          </ActionButton>
          <ActionButton onClick={() => navigate('/post-list')}>
            <Icon src={require('../assets/VolunteerIcon.png')} alt="봉사참여" />
            봉사참여
          </ActionButton>

        </ButtonWrapper>
        <NoticeBox>
          <Icon src={require('../assets/check.png')} alt="도움요청" />
          봉사 인증을 해주세요. <br />
          <strong>2025년 6월 22일</strong>
        </NoticeBox>
        <Divider />
        <SectionTitle>🌱 새싹 도우미</SectionTitle>
        <ScoreText>이웃에게 <strong>{score}번</strong>의 손을 내밀었어요.</ScoreText>
        <Badge>활동카테고리 {remainingCategory}번 남았어요!</Badge>
        <ProgressBarWrapper>
          <ProgressBarInner style={{ width: `${(10 - remainingCategory) * 10}%` }} />
        </ProgressBarWrapper>
        <DoubleButtonWrapper>
          <HalfButton onClick={() => navigate('/transfer')}>명예의 전당</HalfButton>
<HalfButton onClick={() => setIsModalOpen(true)}>랭크 설명</HalfButton>

{isModalOpen && (
  <ModalOverlay onClick={() => setIsModalOpen(false)}>
    <RankModal onClick={e => e.stopPropagation()}>
      <ModalHeader>
        <Title>랭크 설명</Title>
        <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
      </ModalHeader>
      <RankList>
        <RankItem><span>🌱 새싹 도우미</span> - 기본등급</RankItem>
        <RankItem>🔥 활동가 - 누적 봉사 시간 <strong>10시간</strong> 이상</RankItem>
        <RankItem>🏡 마을지킴이 - 누적 <strong>30시간</strong></RankItem>
        <RankItem>📍 지역리더 - 누적 <strong>60시간</strong></RankItem>
        <RankItem>⭐ 영웅 - 누적 <strong>100시간</strong></RankItem>
      </RankList>
      <InfoText>
        ✅ 봉사 시간이 쌓이면 자동으로 랭크가 올라갑니다. <br />
        ✅ 내 등급은 마이페이지에서 확인할 수 있어요.
      </InfoText>
    </RankModal>
  </ModalOverlay>
)}
       </DoubleButtonWrapper>
      </Container>
      <BottomNavigationBar /> 
    </MobileLayout>
  );
};

export default Home;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); // 어두운 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 8px;
  display: block;
`;

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  flex: 1;
  overflow-y: auto;
`;

const Region = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: #3EC6B4; /* Brand_2 */
  color: #fff;
  padding: 30px;
  font-size: 16px;
  border: none;
  align-items: center
  border-radius: 12px;
   display: flex;             // ✅ 아이콘과 텍스트 나란히
  font-weight: 600;
`;

const NoticeBox = styled.div`
  background-color: #B2ECE4; /* Brand_3 */
  color: #000;
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: 20px 0;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
`;

const ScoreText = styled.p`
  font-size: 14px;
  color: #000;
  margin-bottom: 8px;
`;

const Badge = styled.div`
  display: inline-block;
  background-color: #C8FFF0;
  color: #2B9E90; /* Brand_1 */
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  margin-bottom: 12px;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 24px;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background-color: #3EC6B4; /* Brand_2 */
`;

const DoubleButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const HalfButton = styled.button`
  flex: 1;
  background-color: #e0f7fa;
  border: 1px solid #3EC6B4;
  border-radius: 12px;
  padding: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #000;
`;

const RankModal = styled.div`
  width: 90%;
  max-width: 320px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  z-index: 1000;
`;


const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const CloseButton = styled.button`
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
`;

const RankList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RankItem = styled.li`
  font-size: 14px;
  margin-bottom: 12px;
  color: #2B9E90;

  span {
    font-weight: bold;
    margin-right: 8px;
    color: #000;
  }

  strong {
    color: #000;
  }
`;

const InfoText = styled.div`
  font-size: 13px;
  margin-top: auto;
  color: #555;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 10px;
  line-height: 1.5;
`;
