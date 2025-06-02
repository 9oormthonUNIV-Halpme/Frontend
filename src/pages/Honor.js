import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { useNavigate } from 'react-router-dom';

const medalIcons = [
  require('../assets/Gold.png'),
  require('../assets/Silver.png'),
  require('../assets/Bronze.png')
];

const Honor = () => {
  const { token } = useContext(AuthContext);
  const [rankList, setRankList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://halpme.site/api/v1/rank/top', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.data.success) {
        setRankList(res.data.data);
      }
    })
    .catch((err) => console.error(err));
  }, [token]);

  return (
    <AppWrapper>
      <Content>
        <Container>
          <HeaderRow>
            <BackIcon onClick={() => navigate('/home')}>
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.89258 13.3027L1.89258 7.30273L7.89258 1.30273" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </BackIcon>
            <Title>명예의 전당</Title>
          </HeaderRow>

          <SubTitle>TOP 10 ⭐</SubTitle>

          {rankList.map((user, index) => (
            <UserItem key={index}>
              <Left>
                {index < 3 ? (
                  <MedalIcon src={medalIcons[index]} alt={`${index + 1}위`} />
                ) : (
                  <RankText>{index + 1}위</RankText>
                )}
                <NameAndScore>
                  <Nickname>{user.nickname}</Nickname>
                  <VolunteerHours>{user.totalVolunteerHours}점</VolunteerHours>
                </NameAndScore>
              </Left>
            </UserItem>
          ))}
        </Container>
        <BottomNavigationBar />
      </Content>
    </AppWrapper>
  );
};

export default Honor;


// 스타일
const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 800px;
  max-width: 360px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; // ✅ 수직 배치 유지
  align-items: flex-start; // ✅ 자식 요소들 왼쪽 정렬
  padding: 24px;
`;

const NameAndScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;  // ✅ 높이 보정
  gap: 2px;
  margin-left: 8px; // ✅ 왼쪽 여백 추가 (원하는 만큼 조절 가능, 예: 4~12px)
`;


const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackIcon = styled.div`
  margin-right: 12px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
`;

const SubTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;         // 아이콘 세로 정렬용
  gap: 8px;
  text-align: left;            // 텍스트는 이걸로!
  margin-bottom: 24px;        // ✅ 제목과 사용자 목록 사이 공백
`;


const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px; // ✅ 순위 사이 공백
  width: 100%;
`;


const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;


const MedalIcon = styled.img`
  width: 48px;
  height: 40px;
  margin-right: 8px;
`;

const RankText = styled.div`
  width: 28px;
  font-weight: bold;
  margin-right: 10px;

  display: flex;           // ✅ 세로 정렬을 위해 flex 사용
  align-items: center;     // ✅ 수직 중앙 정렬
  height: 40px;            // ✅ 아이콘 높이에 맞춤
  margin-left: 14px; // ✅ 왼쪽 여백 추가 (원하는 만큼 조절 가능, 예: 4~12px)

`;


const Nickname = styled.div`
  font-size: 16px;
  text-align: left;
  font-weight: bold;
`;

const VolunteerHours = styled.div`
  font-size: 14px;
  color: #888;
  text-align: left;
  padding: 4px 2px;
`;
