import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BottomNavigationBar = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavItem onClick={() => navigate('/home')}>
        <Icon src="/favicon.ico" alt="홈" />
        <Label>홈</Label>
      </NavItem>
      <NavItem onClick={() => navigate('/chat')}>
        <Icon src="/favicon.ico" alt="채팅" />
        <Label>채팅</Label>
      </NavItem>
      <NavItem onClick={() => navigate('/my-page')}>
        <Icon src="/favicon.ico" alt="회원정보" />
        <Label>회원정보</Label>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNavigationBar;

// Styled Components
const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 64px;
  width: 100%;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Label = styled.span`
  font-size: 11px;
`;

