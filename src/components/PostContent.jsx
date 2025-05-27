import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import backIcon from "./../assets/BackIcon.png";
import timeIcon from "./../assets/TimeIcon.png";
import dateIcon from "./../assets/DateIcon.png";

const PostContent = ({ value }) => {
    const navigate = useNavigate();

    if (!value || !value.address) return null;

    const { address, title, requestDate, requestTime, content, nickname } = value;

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <PostContentContainer>
            <PostAdress>
                <BackButton onClick={handleBack}>
                    <img src={backIcon} alt="back"/>
                </BackButton>
                <AddressText>{address.basicAddress}</AddressText>
            </PostAdress>
            
            <PostTitle>{title}</PostTitle>
            
            <PostDateTime>
                <PostDate>
                    <PostDateImg>
                        <img src={dateIcon} alt="date" />
                    </PostDateImg>
                    <PostDateText>{requestDate}</PostDateText>
                </PostDate>
                <PostTime>
                    <PostTimeImg>
                        <img src={timeIcon} alt="time" />
                    </PostTimeImg>
                    <PostTimeText>{requestTime}</PostTimeText>
                </PostTime>
            </PostDateTime>

            <PostContentText>{content}</PostContentText>
        </PostContentContainer>
    );
};

export default PostContent;



const PostContentContainer = styled.div`
    width: 95%;
    height: 610px;
    margin-top: 44px;
    border: none;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 좌우 끝 배치 */
`;

const PostAdress = styled.div`
    width: 100%;
    height: 50px;
    border: none;
    box-sizing: border-box;
    margin-bottom: 32px;

    display: flex;
    align-items: center;          // 세로 중앙 정렬
    justify-content: flex-start; // 왼쪽 정렬
`;

const BackButton = styled.button`
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    padding 0;
    cursor: pointer;

    img {
        width: 6px;
        height: 12px;
    }
`;

const AddressText = styled.div`
    border: none;
    padding: 0px 8px;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
`;

const PostTitle = styled.div`
    width: 100%;
    height: 54px;
    border-bottom: 1px solid black;
    box-sizing: border-box;

    font-size: 20px;
    font-weight: bold;
    color: #000000;
    display: flex;
    align-items: center; 
`;

const PostDateTime = styled.div`
    width: 100%;
    height: 78px;
    border-bottom: 1px solid black;
    margin-bottom: 24px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 
`;

const PostDate = styled.div`
    width: 100%;
    height: 19px;
    border: none;
    box-sizing: border-box;
    margin-top: 16px;
    margin-bottom: 8px;

    display: flex;
    align-items: center; 
`;

const PostDateImg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 18px;
        height: 18px;
        display: block;
    }
`;

const PostDateText = styled.div`
    width: 120px;
    height: 19px;
    padding-left: 10px;
    font-size: 16px;
    align-items: center; 

    display: flex;
    justify-content: flex-start;
`;

const PostTime = styled.div`
    width: 100%;
    height: 19px;
    border: none;
    box-sizing: border-box;
    margin-bottom: 16px;

    display: flex;
    align-items: center; 
`;

const PostTimeImg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 18px;
        height: 18px;
        display: block;
    }
`;

const PostTimeText = styled.div`
    width: 120px;
    height: 19px;
    padding-left: 10px;
    font-size: 16px;

    display: flex;
    justify-content: flex-start;
    align-items: center; 
`;

const PostContentText = styled.div`
    width: 100%;
    height: 330px;
    overflow-y: auto;
    border: none;
    box-sizing: border-box;
    font-size: 16px;
    text-align: justify;

    white-space: pre-line;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
`;