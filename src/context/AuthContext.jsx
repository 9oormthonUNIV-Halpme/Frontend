import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const email = useMemo(() => {
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      //console.log("이메일 추출: ", JSON.parse(jsonPayload)?.sub);
      return JSON.parse(jsonPayload)?.sub ?? null;
    } catch (err) {
      console.error("JWT 파싱 실패:", err);
      return null;
    }
  }, [token]);

  // 앱 시작 시 로컬스토리지에서 토큰 읽어 로그인 상태 초기화
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
    else {
      setIsLoading(false);
    }
  }, []);

  // 토큰 변경시 사용자 정보 fetch
  useEffect(() => {
    if(token) {
      fetchUserInfo(token).finally(() => setIsLoading(false));
    }
    else {
      setUser(null);
      setIsLoading(false);
    }
  }, [token]);

  // 사용자 정보 불러오기 함수
  const fetchUserInfo = async (jwt) => {
    try{
        const res = await axios.get("https://halpme.site/api/v1/members/my-page", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log(res.data.data);

        if (res.data.success){
            setUser(res.data.data);
            // console.log(res.data.data);
            console.log("사용자 정보 요청 성공")
        }
        else {
            console.warn("사용자 정보 요청 실패(서버 응답 성공)", res.data.message);
            logout(); 
        }
    }
    catch (err) {
        if(err.response && err.response.status === 401){
          console.warn("토큰이 만료되었거나 유효하지 않습니다. 자동으로 로그아웃 진행하였습니다.");
          logout();
        }
        else{
          console.error("네트워크 오류 또는 서버 오류", err);
        }
    }
  }

  // 로그인 성공 시 호출하는 함수
  const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    await fetchUserInfo(newToken);
  };

  // 로그아웃 시 호출하는 함수
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    token,
    isLoggedIn,
    user,
    email,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
