import React from "react";
import styled from "styled-components";
import cameraIcon from "../assets/CameraIcon.png";
import galleryIcon from "../assets/GalleryIcon.png";

const CameraMenu = React.forwardRef(({ onSelectPhotoShoot, onSelectImagePick }, ref) => {

    return (
        <MenuContainer ref={ref}>
        <MenuButton onClick={onSelectPhotoShoot}>
            사진 촬영하기
            <MenuIcon src={cameraIcon} alt="카메라" />
        </MenuButton>
        <MenuButton onClick={onSelectImagePick}>
            이미지 선택하기
            <MenuIcon src={galleryIcon} alt="갤러리" />
        </MenuButton>
        </MenuContainer>
    );
});

export default CameraMenu;

const MenuContainer = styled.div`
  width: 217px;
  height: 80px;
  position: absolute;
  bottom: 100%; 
  left: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
`;

const MenuButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border: none;
  background: white;
  box-shadow: 0px 0px 1px rgba(0,0,0,0.10);
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #000000;

  &:hover {
    background-color: #eee;
  }
`;

const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
`;
