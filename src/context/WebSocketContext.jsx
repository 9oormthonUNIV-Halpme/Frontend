import React, { createContext, useContext, useEffect, useRef, useCallback, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { AuthContext } from "../context/AuthContext";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const stompClientRef = useRef(null);
  
  const { token, isLoggedIn, logout, isLoading } = useContext(AuthContext);
  const [sub, setSub] = useState({});

  useEffect(() => {
    if (isLoading) return; // 사용자 정보 아직 가져오지 못함

    if(!isLoggedIn || !token){
        console.warn("로그인되지 않았거나 토큰이 없습니다. 웹소켓 연결을 시도하지 않습니다.");
        return;
    }

    const socket = new SockJS("https://halpme.site/chat/inbox");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      { Authorization: "Bearer " + token },
      () => {
        console.log("웹소켓 연결 성공");
        stompClientRef.current = stompClient; // Ref를 통해 언마운트시 웹소켓 연결 해제할 때 쉽게 접근 가능
        window.stompClient = stompClient; // 디버깅용
      },
      (error) => {
        console.error("웹소켓 연결 실패", error);
        if (error?.headers?.message?.includes("Unauthorized")) {
          console.warn("토큰이 만료 또는 유효하지 않아 로그아웃 처리됨");
          logout();
        }
      }
    );

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log("웹소켓 연결 해제");
        });
      }
    };
  }, [token, isLoggedIn, logout]);

  // 텍스트 또는 이미지 메시지 전송 함수
  const sendMessage = useCallback(
    ({ roomId, message, messageType = "TEXT", imageUrls = [] }) => {
        console.log("sendMessage 호출됨:", { roomId, message, messageType, imageUrls });
        if(!stompClientRef.current?.connected){
            console.warn("웹소켓 연결 실패");
            return;
        }

        const payload = { roomId, message, messageType };
        if(imageUrls.length) payload.imageUrls = imageUrls;
        
        stompClientRef.current.publish({
            destination: "/pub/message",
            body: JSON.stringify(payload),
        });
    }, []);

  // 읽음 처리 함수
const markAtRead = useCallback((roomId) => {
  if (!stompClientRef.current?.connected) {
    console.warn("웹소켓 연결 실패");
    return;
  }

  stompClientRef.current.send("/pub/read-room", {}, roomId); // ← JSON.stringify 쓰지 마세요!
}, []);

  // 채팅방 Subscribe 함수
  const subscribe = useCallback((roomId, onMessage, onReadStatus) => {
    if(!stompClientRef.current?.connected){
        console.warn("웹소켓 연결 실패");
        return () => {};
    }

    // 새 메시지
    const chatSub = stompClientRef.current.subscribe(
        `/sub/channel/${roomId}`,
        (msg) => {
            const body = JSON.parse(msg.body);
            onMessage?.(body);
        }
    );

    // 읽음 상태
    let readSub = null;
    if(onReadStatus) {
        readSub = stompClientRef.current.subscribe(
            `/sub/channel/${roomId}/read-status`,
            (msg) => onReadStatus(JSON.parse(msg.body))
        );
    }

    // 첫 입장 시 마지막 미읽음 메시지 한 건만 읽음 처리하면 전체 읽음 처리
   stompClientRef.current.send("/pub/read-room", {}, roomId); // ← 그냥 문자열로!



    // un-subscribe 콜백 반환
    return (() => {
        chatSub?.unsubscribe();
        readSub?.unsubscribe();
    });  
  }, []);
  

  return (
    <WebSocketContext.Provider value={{ sendMessage, markAtRead, subscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};
