import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 앱 시작 시 로컬스토리지에서 토큰 읽어 로그인 상태 초기화
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchUserInfo(savedToken).finally(() => setIsLoading(false));
    }
    else {
      setIsLoading(false);
    }
  }, []);

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
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
