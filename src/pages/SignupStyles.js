import styled from 'styled-components';

/* 전체 페이지 컨테이너 */
export const Container = styled.div`
  width: 360px;
  height: 700px;
  margin: 0 auto;
  padding: 32px 24px;

  background: #FFFFFF; /* 배경색 흰색으로 */
  font-family: 'Pretendard', sans-serif;
  border: 1px solid #000000; /* Border_1 */
`;

/* 최상단 제목 */
export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700; /* Bold */
  margin-bottom: 20px;
  color: #000000; /* Text_Main */
  text-align: left;
`;

/* 라벨 텍스트 (이름, 전화번호 등) */
export const Label = styled.label`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500; /* Medium */
  display: block;
  color: #000000; /* Text_Main */
  text-align: left;
`;

/* 입력창 스타일 */
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #F5F5F5; /* BG_2 */
  color: #000;
  box-sizing: border-box;
`;

/* 나이 + 성별 선택 영역을 감싸는 행 */
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

/* 성별 선택 버튼 */
export const GenderButton = styled.button`
  padding: 10px 16px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: ${({ selected }) => (selected ? '#000' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 14px;
  cursor: pointer;
`;

/* 주소 입력창 + 검색 아이콘 */
export const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

/* 돋보기 아이콘 버튼 */
export const SearchIcon = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

/* 확인 버튼 */
export const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  background: #2B9E90; /* Brand_1 */
  color: white;
  font-size: 16px;
  font-weight: 600; /* Semibold */
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

/* 하단 로그인 안내 */
export const Footer = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #888888; /* Text_2 */
`;

/* 로그인 링크 텍스트 */
export const LinkText = styled.a`
  color: #000000; /* Text_Main */
  font-weight: bold;
  margin-left: 4px;
  text-decoration: none;
`;
