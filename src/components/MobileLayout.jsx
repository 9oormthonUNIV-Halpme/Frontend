// src/components/layout/MobileLayout.js
import React from "react";
import styled from "styled-components";

const MobileLayout = ({ children }) => {
  return (
    <AppWrapper>
      <Content>{children}</Content>
    </AppWrapper>
  );
};

export default MobileLayout;

// 스타일 컴포넌트
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
  // justify-content: space-between;  // 공간을 위와 아래로 분산
  gap: 24px;
  width: 100%;
  height: 800px;
  max-width: 360px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  align-items: center;
`;