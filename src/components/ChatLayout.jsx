import styled from "styled-components";

const ChatLayout = ({ children }) => {
  return (
    <AppWrapper>
      <Content>{children}</Content>
    </AppWrapper>
  );
};

export default ChatLayout;

// 스타일 컴포넌트
const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 800px;
  max-width: 360px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  align-items: center;
`;
