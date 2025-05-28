import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostVisitorButtons = () => {
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate("/chat");
    };

    return (
        <PostVisitorButtonsContainer>
            <ChatButton onClick={handleChatClick}>채팅하기</ChatButton>
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
