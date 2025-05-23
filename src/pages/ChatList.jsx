// src/pages/Login.js
import React, { Children } from "react";
import MobileLayout from "../components/MobileLayout";
import BottomNavigationBar from "../components/BottomNavigationBar";

const ChatList = () => {
  return (
    <MobileLayout>
        <div>
            <p>채팅 리스트 내용</p>
        </div>
        <BottomNavigationBar />    
    </MobileLayout>
  );
};

export default ChatList;
