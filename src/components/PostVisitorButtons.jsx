import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const PostVisitorButtons = ({ postId }) => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [chatroomId, setChatroomId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChatClick = async () => {
        if(!token) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "https://halpme.site/api/v1/chatRoom/personal",
                { guestPostId: postId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const chatroomId = response.data.data.chatRoomId;
            console.log("채팅방 생성 성공", chatroomId);
            navigate(`/chat/${chatroomId}`);
        }
        catch (err) {
            setError("채팅방 생성에 실패");
            console.error(err);
        }
        finally {
            setLoading(false);
        }   
    };

    return (
        <PostVisitorButtonsContainer>
            <ChatButton onClick={handleChatClick} disabled={loading}>
                {loading ? "채팅방 생성 중..." : "채팅하기"}
            </ChatButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </PostVisitorButtonsContainer>
    );
};

export default PostVisitorButtons;


const PostVisitorButtonsContainer = styled.div`
    width: 95%;
    height: 116px;
    box-sizing: border-box;
    margin-bottom: 30px;
`;


const ChatButton = styled.button`
    width: 100%;
    height: 50px;
    background-color: #2B9E90;
    color: #FFFFFF;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 66px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 8px;
`;