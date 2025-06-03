import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar'; 

const Home = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingCategory, setRemainingCategory] = useState(1);

  useEffect(() => {
    axios.get('https://halpme.site/api/v1/rank/my-points', {
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
      
        <Divider />
    <RankHeaderRow>
      <RankIcon src={require('../assets/Lankplant.png')} alt="새싹도우미" />
      <SectionTitle>새싹 도우미</SectionTitle>
    </RankHeaderRow>

        <ScoreText>{user?.nickname || '사용자'}님의 현재 점수는 <strong>{score}점</strong>입니다.</ScoreText>
        <Badge>활동카테고리 {remainingCategory}번 남았어요!</Badge>
        <ProgressBarWrapper>
          <ProgressBarInner style={{ width: `${(10 - remainingCategory) * 10}%` }} />
        </ProgressBarWrapper>
        <DoubleButtonWrapper>
          <PrimaryButton onClick={() => navigate('/honor')}>명예의 전당</PrimaryButton>
          <SecondaryButton onClick={() => setIsModalOpen(true)}>랭크 설명</SecondaryButton>

{isModalOpen && (
  <ModalOverlay onClick={() => setIsModalOpen(false)}>
    <RankModal onClick={e => e.stopPropagation()}>
      <ModalHeader>
        <Title>랭크 설명</Title>
        <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
      </ModalHeader>
      <RankList>
  <RankItem>
    <RankRow>
      <RankIcon src={require('../assets/Lankplant.png')} alt="새싹도우미" />
      <RankText>
        <RankName>새싹도우미</RankName>
        <RankDesc>기본등급</RankDesc>
      </RankText>
    </RankRow>
  </RankItem>
  <RankItem>
    <RankRow>
      <RankIcon src={require('../assets/Lankhand.png')} alt="활동가" />
      <RankText>
        <RankName>활동가</RankName>
        <RankDesc>누적 봉사 시간 <RankHighlight>10시간</RankHighlight> 이상</RankDesc>
      </RankText>
    </RankRow>
  </RankItem>
  <RankItem>
    <RankRow>
      <RankIcon src={require('../assets/Lankprotect.png')} alt="마을지킴이" />
      <RankText>
        <RankName>마을지킴이</RankName>
        <RankDesc>누적 봉사 시간 <RankHighlight>30시간</RankHighlight> 이상</RankDesc>
      </RankText>
    </RankRow>
  </RankItem>
  <RankItem>
    <RankRow>
      <RankIcon src={require('../assets/Lankfind.png')} alt="지역리더" />
      <RankText>
        <RankName>지역리더</RankName>
        <RankDesc>누적 봉사 시간 <RankHighlight>60시간</RankHighlight> 이상</RankDesc>
      </RankText>
    </RankRow>
  </RankItem>
  <RankItem>
    <RankRow>
      <RankIcon src={require('../assets/Lankstar.png')} alt="영웅" />
      <RankText>
        <RankName>영웅</RankName>
        <RankDesc>누적 봉사 시간 <RankHighlight>100시간</RankHighlight> 이상</RankDesc>
      </RankText>
    </RankRow>
  </RankItem>
</RankList>



      <RankGuideTitle>랭크는 어떻게 적용되나요?</RankGuideTitle>

      <InfoText>
        <NoticeLine>
          <DotIcon src={require('../assets/Lankdot.png')} alt="체크" />
          봉사 시간 1시간 당 1점으로 계산됩니다.
        </NoticeLine>
        <NoticeLine>
          <DotIcon src={require('../assets/Lankdot.png')} alt="체크" />
          봉사 시간이 자동으로 누적돼요.
        </NoticeLine>
        <NoticeLine>
          <DotIcon src={require('../assets/Lankdot.png')} alt="체크" />
          누적 시간이 일정 기준에 도달하면 자동으로 단계가 올라가요.
        </NoticeLine>
        <NoticeLine>
          <DotIcon src={require('../assets/Lankdot.png')} alt="체크" />
          내 등급은 홈 화면이나 마이페이지에서 확인할 수 있어요.
        </NoticeLine>
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
  width: 24px;
  height: 24px;
  margin-top: 4px; // 아이콘 위치 조정
  margin-right: 8px; // 아이콘과 텍스트 사이 간격
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
  padding-bottom: 50px;
  padding-top: 10px;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* 버튼 사이 간격 */
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  width: 156px;
  height: 96px;
  background-color: #3EC6B4;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const NoticeLine = styled.div`
  display: flex;
  align-items: left;
  gap: 8px;
  margin-bottom: 6px;
  color: #000;
  font-size: 13px;
`;


const PrimaryButton = styled.button`
  width: 90px;
  height: 40px;
  background-color: #2F4858;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 0 10px;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  width: 90px;
  height: 40px;
  background-color: #F2F2F2;
  color: #888888;
  font-size: 14px;
  font-weight: 600;
  border: none;h
  border-radius: 6px;
  padding: 0 10px;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: 20px 0;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
  text-align: left;
  line-height: 1;
`;

const ScoreText = styled.p`
  font-size: 16px;
  color: #000;
  margin-bottom: 8px;
  text-align: left;
`;

const Badge = styled.div`
  color: #2B9E90; /* Brand_1 */
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: left;
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
  justify-content: center;  // ✅ 가운데 정렬
  align-items: center;
  gap: 20px;                 // 버튼 사이 간격 (Figma 기준)
  margin-top: 12px;
`;

const RankModal = styled.div`
  width: 90%;
  max-width: 380px;  // ✅ 너비 확장
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  z-index: 1000;
`;

const RankRow = styled.div`
  display: flex;
  align-items: center;
`;

const RankIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  flex-shrink: 0;
  vertical-align: middle;
`;
const RankText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 20px;  // ✅ 랭크명과 설명 사이 간격
`;
const RankName = styled.div`
  font-weight: bold;
  color: #000;
  font-size: 14px;
  min-width: 70px;  // ✅ 균일한 정렬을 위해 고정 너비 설정
`;

const RankDesc = styled.div`
  color: #888888;
  font-size: 14px;
  margin-left: 40px;
`;
const RankHighlight = styled.strong`
  color: #2B9E90;
  font-weight: bold;
`;

const RankHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px; // 아이콘과 텍스트 사이 간격
  margin-bottom: 20px;
`;

const DotIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 8px;
  margin-top: 2px;
  flex-shrink: 0;
`;

const RankGuideTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-top: 20px;
  margin-bottom: 8px;
  text-align: left;
  gap: 30px;
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
  text-align: left;
  color: #2B9E90;

  span {
    font-weight: bold;
    margin-right: 8px;
    color: #000;
  }

 
`;

const InfoText = styled.div`
  font-size: 13px;
  margin-top: auto;
  color: #000;
  padding: 12px;
  border-radius: 10px;
  line-height: 1.5;
`;
