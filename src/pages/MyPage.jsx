import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import BottomNavigationBar from '../components/BottomNavigationBar';
import MobileLayout from '../components/MobileLayout';
import { FaUserEdit, FaHandsHelping, FaMedal } from 'react-icons/fa';
import VI from '../assets/VI.png';
import { AuthContext } from '../context/AuthContext'; // ✅ AuthContext import

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // ✅ logout 함수 사용

  const handleLogout = () => {
    logout();             // ✅ 토큰, 유저 정보 초기화
    navigate('/');   // ✅ 로그인 페이지로 이동
  };

  return (
    <MobileLayout>
      <Header>
        <Title>회원정보</Title>
      </Header>

      <MenuWrapper>
        <MenuItem to="/edit-profile"><FaUserEdit />회원정보 수정</MenuItem>
        <MenuItem to="/help-history"><FaHandsHelping />도움요청 내역</MenuItem>
        <MenuItem to="/volunteer-history"><Icon src={VI} alt="봉사참여 내역" />봉사참여 내역</MenuItem>
        <MenuItem to="/honor"><FaMedal />명예의 전당</MenuItem>
      </MenuWrapper>

      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>

      <BottomNavigationBar />
    </MobileLayout>
  );
};

export default MyPage;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const Header = styled.div`
  padding: 24px 20px 12px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  margin: 0;
  text-align: left;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff; 
  border-radius: 8px;
  overflow: hidden;
  margin: 0 16px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 8px 0;
  align-self: stretch;
`;

const MenuItem = styled(Link)`
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: #000;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  &:after {
    content: '›';
    margin-left: auto;
    font-size: 16px;
    color: #999;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  svg {
    flex-shrink: 0;
  }
`;

const LogoutButton = styled.button`
  margin: 24px auto;
  padding: 10px 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: none;
  font-size: 14px;
  color: #000;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
