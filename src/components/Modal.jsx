// components/Modal.js
import React from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <Message>{message}</Message>
        <ButtonRow>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 300px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background: #2B9E90;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #3EC6B4;
  }
`;
