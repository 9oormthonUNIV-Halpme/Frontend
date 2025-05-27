import styled from "styled-components";

const PostAuthorButtons = () => {

    return (
        <PostAuthorButtonsContainer>
            <EditPostButton>수정하기</EditPostButton>
            <DeletePostButton>삭제하기</DeletePostButton>
        </PostAuthorButtonsContainer>
    );
};

export default PostAuthorButtons;


// export default function PostAuthorButtons({ onEdit, onDelete }) {
//   return (
//     <div>
//       <button onClick={onEdit}>수정</button>
//       <button onClick={onDelete}>삭제</button>
//     </div>
//   );
// }

const PostAuthorButtonsContainer = styled.div`
    width: 95%;
    height: 116px;
    box-sizing: border-box;
    margin-bottom: 30px;
`;


const EditPostButton = styled.button`
    width: 100%;
    height: 50px;
    background-color: #2B9E90;
    color: #FFFFFF;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 16px;
`;

const DeletePostButton = styled.button`
    width: 100%;
    height: 50px;
    background-color: #FFFFFF;
    color: #2B9E90;
    border: 1px solid #2B9E90;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
`;
