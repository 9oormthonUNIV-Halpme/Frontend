import React, { useRef } from "react";
import cameraIcon from "./../assets/CameraIcon.png";
import sendIcon from "./../assets/SendIcon.png";
import CameraMenu from "./CameraMenu";

import styled from "styled-components";

const ChatInput = ({
    text,
    textareaRef,
    showCameraMenu,
    cameraButtonRef,
    menuRef,
    inputCameraRef,
    inputGalleryRef,
    handleChange,
    toggleCameraMenu,
    onFileSelected,
    handlePhotoShoot,
    handleImgPick,    
    onSend,
    onKeyDown,
}) => {
    return (
        <ChatInputWrapper>
            <CameraButtonWrapper>
                <CameraButton ref={cameraButtonRef} onClick={toggleCameraMenu}>
                    <img src={cameraIcon} alt="camera"/>
                </CameraButton>
                {showCameraMenu && (
                    <CameraMenu 
                        ref={menuRef}
                        onSelectPhotoShoot={handlePhotoShoot} 
                        onSelectImagePick={handleImgPick} 
                    />
                )}
            </CameraButtonWrapper>
            {/* 화면에서는 보이지 않음. 순서대로 사진촬영, 갤러리리 */}
            <input 
                type="file"
                accept="image/*"
                multiple
                style={{display: "none"}}
                ref={inputCameraRef}
                onChange={onFileSelected}
            />
            <input 
                type="file"
                accept="image/*"
                multiple
                style={{display: "none"}}
                ref={inputGalleryRef}
                onChange={onFileSelected}
            />

            <InputForm 
                ref={textareaRef}
                value={text}
                placeholder="메시지를 입력하세요." 
                onChange={handleChange}
                onKeyDown={onKeyDown}
                rows={1}
            />

            <SendButton onClick={onSend}>
                <img src={sendIcon} alt="send"/>
            </SendButton>
        </ChatInputWrapper>
    );
};

export default ChatInput;

const ChatInputWrapper = styled.div`
  border: none;
  width: 100%;
  min-height: 64px;
  box-sizing: border-box;
  padding: 8px 0px;
  display: flex;
  align-items: flex-end;
  justify-content: cener;
`;

const CameraButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CameraButton = styled.button`
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    padding 0;
    margin-left: 8px;
    cursor: pointer;

    img {
        width: 22px;
        height: 18px;
    }
`;

const InputForm = styled.textarea`
    flex: 1;
    height: 48px;
    max-height: 120px;
    border: none;
    background-color: #F5F5F5;
    padding: 8px;
    font-size: 20px;
    text-align: left;
    font-family: 'Noto Sans KR', 'Inter', 'Roboto', sans-serif;
    color: #000000;
    border-radius: 4px; 
    box-sizing: border-box;
    resize: none;
    line-height: 32px;
    overflow-y: hidden;

    &::placeholder {
    color: #888888;
  }

  outline: none;
`;

const SendButton = styled.button`
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    padding 0;
    margin-left: 8px;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
    }
`;

