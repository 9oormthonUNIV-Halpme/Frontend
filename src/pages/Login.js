import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import logo from "../assets/HalpmeLogo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import facomment from "../assets/Kakao_Logo.png";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    // 로그인 실행
    const handleLogin = async () => {
      if (!email.trim() || !pw.trim()) {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
        return;
      }


      try {
        const response = await axios.post("https://halpme.site/api/v1/auth/login", {
          email: email,
          pw: pw
        });

        //console.log("API 응답:", response);          // 전체 응답 객체 확인
        console.log("응답 데이터:", response.data);   // 응답 본문만 확인

        if (response.data.success) {
          const token = response.data.data.token;
          login(token);
          alert("로그인 성공");
          navigate("/home");
        } 
        else {
          alert("로그인 실패: " + response.data.message);
        }
      } 
      catch (error) {
        console.error("로그인 오류:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    };

    // Enter 키 입력 처리(일반 로그인)
    const handleKeyDown = (e) => {
      if(e.key === 'Enter' )
        handleLogin();
    };

    // 카카오 소셜 계정 로그인
    const REST_API_KEY = "백엔드";
    const REDIRECT_URI = "백엔드";
    const kakaoLoginlink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const socialLoginHandler = () => {
      window.location.href = kakaoLoginlink;
    };

    return (
        <AppWrapper>
            <Content>
                <LogoWrapper>
                    <img 
                        src={logo}
                        alt="Halpme 로고"
                        /* style={{ width: '200px', height: '200px'  }} */
                        
                    />
                </LogoWrapper>
                
                <FormWrapper onKeyDown={handleKeyDown}>
                    <FormGroup>
                        <Label>이메일</Label>
                        <Input 
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>비밀번호</Label>
                        <Input
                        type="password"
                        placeholder="••••••••" 
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        />
                    </FormGroup>

                    <LoginButton onClick={handleLogin}>로그인</LoginButton>
                    
                    <Text>
                        계정이 없으신가요? <BoldLink to="/signup">회원가입</BoldLink>
                    </Text>
                    
                    <ButtonContent>
                        <GuideText>또는 소셜 계정으로 로그인</GuideText>
                        <KakaoButton onClick={socialLoginHandler}>
                            <FacommentImg src={facomment} alt="말풍선" />
                            <span>카카오 계정으로 로그인</span>
                        </KakaoButton>
                    </ButtonContent>
                </FormWrapper>
            </Content>
        </AppWrapper>
    );
}

export default Login;

// 공통 레이아웃
const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  background-color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  position: relative;
  align-items: center;
`;

// 로고
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;

  img {
    margin: 42px;
    height: 200px;
    width: 200px;
  }
`;

// 로그인 포맷(이메일, 비밀번호 입력)
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  margin: 0px 10px;
  font-size: 16px;
  color: #000000;
  text-align: left;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  margin: 0px auto;
  background: #F5F5F5;
  color: #888888;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a0d9c7;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #2B9E90;
  color: white;
  margin: 0px auto;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: max(48px, 2vh); 

  &:hover {
    background-color: #3EC6B4;
  }
`;

// 로그인 창에서 회원가입 창으으로 전환
const Text = styled.div`
  width: 39px
  font-size: 14px;
  margin: 5px;
  color: #888888;
`;

const BoldLink = styled(Link)`
  width: 76px;
  height: 39px;
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-decoration: none;
`;

// 소셜 계정으로 로그인
const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 48px;
`;

const GuideText = styled.p`
  color: #888888;
  font-size: 14px;
  margin: 0 auto
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  color: #000;
  font-weight: bold;
  font-size: 16px;
  padding: 16px 0px;
  border: none;
  border-radius: 12px;
  width: 328px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 10px;
  .icon {
    font-size: 20px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const FacommentImg = styled.img`
  width: 24px;
  height: 24px;
`;
