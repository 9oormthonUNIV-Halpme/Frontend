import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PostAuthorButtons = ({ value }) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  const handleEdit = () => {
    navigate('/writing', {
      state: {
        isEdit: true,
        postId: value.postId,
        postData: value,
      },
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://halpme.site/api/v1/posts/${value.postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      setShowDeletedModal(true); // ✅ 삭제 성공 모달 띄움
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const closeDeletedModal = () => {
    setShowDeletedModal(false);
    navigate('/post-list');
  };

  return (
    <PostAuthorButtonsContainer>
      <EditPostButton onClick={handleEdit}>수정하기</EditPostButton>
      <DeletePostButton onClick={() => setShowDeleteModal(true)}>삭제하기</DeletePostButton>

      {/* 삭제 전 확인 모달 */}
      {showDeleteModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
            <ModalText>삭제된 글은 복구할 수 없습니다.</ModalText>
            <ModalButtons>
              <ModalButton $cancel onClick={() => setShowDeleteModal(false)}>취소</ModalButton>
              <ModalButton onClick={handleDelete}>삭제</ModalButton>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* 삭제 완료 안내 모달 */}
      {showDeletedModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>삭제되었습니다.</ModalTitle>
            <ModalButtons>
              <ModalButton onClick={closeDeletedModal}>확인</ModalButton>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}
    </PostAuthorButtonsContainer>
  );
};

export default PostAuthorButtons;


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

// 🟢 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  width: 300px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ModalText = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.$cancel ? '#e0e0e0' : '#2B9E90'};
  color: ${props => props.$cancel ? '#000' : '#fff'};
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;