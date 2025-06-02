// src/pages/Honor.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar';

const medalIcons = [
  require('../assets/Gold.png'),    // 1위
  require('../assets/Silver.png'),  // 2위
  require('../assets/Bronze.png')   // 3위
];

const Honor = () => {
  const { token } = useContext(AuthContext);
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    axios.get('https://halpme.site/api/v1/rank/top', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.data.success) {
        setRankList(res.data.data); // 배열 형태
      }
    })
    .catch((err) => console.error(err));
  }, [token]);

  return (
    <MobileLayout>
      <Container>
        <Title>명예의 전당</Title>
        <SubTitle>TOP 10 ⭐</SubTitle>
        {rankList.map((user, index) => (
          <UserItem key={index}>
            <Left>
              {index < 3 ? (
                <MedalIcon src={medalIcons[index]} alt={`${index + 1}위`} />
              ) : (
                <RankText>{index + 1}위</RankText>
              )}
              <Nickname>{user.nickname}</Nickname>
            </Left>
            <VolunteerHours>{user.totalVolunteerHours}회</VolunteerHours>
          </UserItem>
        ))}
      </Container>
      <BottomNavigationBar />
    </MobileLayout>
  );
};

export default Honor;

// 스타일 정의
const Container = styled.div`
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  margin-bottom: 24px;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const MedalIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 8px;
`;

const RankText = styled.div`
  width: 28px;
  font-weight: bold;
  margin-right: 8px;
`;

const Nickname = styled.div`
  font-size: 16px;
`;

const VolunteerHours = styled.div`
  font-size: 14px;
  color: #666;
`;
