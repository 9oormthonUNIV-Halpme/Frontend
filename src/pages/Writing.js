import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from "styled-components";
import axios from 'axios';
import MobileLayout from '../components/MobileLayout';
import exite from '../assets/exite.png';

const Writing = () => {
const location = useLocation();
const isEditMode = location.state?.isEdit || false;
const postId = location.state?.postId || null;

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', content: '', zipCode: '', basicAddress: '', detailAddress: '', direction: '',
    requestDate: null, startTime: '', endTime: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
        setForm(prev => ({ ...prev, zipCode: data.zonecode, basicAddress: addr }));
      },
    }).open();
  };
useEffect(() => {
  if (isEditMode && location.state?.postData) {
    const { title, content, address, requestDate, startHour, endHour } = location.state.postData;
    setForm({
      title,
      content,
      zipCode: address.zipCode,
      basicAddress: address.basicAddress,
      detailAddress: address.detailAddress,
      direction: address.direction,
      requestDate: new Date(requestDate),
      startTime: startHour,
      endTime: endHour
    });
  }
}, [isEditMode, location]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const submitToServer = async () => {
  const { title, content, zipCode, basicAddress, detailAddress, direction, requestDate, startTime, endTime } = form;
  const payload = {
    title,
    content,
    address: { zipCode, basicAddress, detailAddress, direction },
    requestDate: requestDate.toISOString().split('T')[0],
    startHour: startTime,
    endHour: endTime
  };

  try {
    if (isEditMode && postId) {
      await axios.put(`https://halpme.site/api/v1/posts/${postId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('봉사 신청글이 수정되었습니다.');
    } else {
      await axios.post('https://halpme.site/api/v1/posts', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('봉사 신청글이 등록되었습니다.');
    }

    navigate('/post-list');
  } catch (error) {
    console.error(error);
    alert('요청에 실패했습니다.');
  }
};


  const handleSubmit = () => {
    const { title, content, zipCode, basicAddress, requestDate, startTime, endTime } = form;
    if (!title || !content || !zipCode || !basicAddress || !requestDate || !startTime || !endTime) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <AppWrapper>
      <Content>
        <FormWrapper>
          <Header>
            <HeaderTitle>도움요청 글쓰기</HeaderTitle>
            <ExitButton onClick={() => navigate('/home')}><Icon src={exite} alt="닫기" /></ExitButton>
          </Header>

          <FormGroup><Label>어떤 제목으로 올려볼까요?</Label>
            <Input name="title" value={form.title} onChange={handleChange} placeholder="제목을 입력해주세요." /></FormGroup>

          <FormGroup><Label>어떤 도움이 필요하신가요?</Label>
            <Textarea name="content" value={form.content} onChange={handleChange} placeholder="내용을 적어주세요." /></FormGroup>

          <FormGroup><Label>날짜</Label>
            <DatePicker selected={form.requestDate} onChange={(date) => setForm(prev => ({ ...prev, requestDate: date }))} dateFormat="yyyy-MM-dd" placeholderText="날짜를 선택하세요" minDate={new Date()} customInput={<StyledInput />} /></FormGroup>

          <FormGroup><Label>시작 시간</Label>
            <DatePicker selected={form.startTime ? new Date(`2000-01-01T${form.startTime}`) : null} onChange={(date) => setForm(prev => ({ ...prev, startTime: date.toTimeString().slice(0, 5) }))} showTimeSelect showTimeSelectOnly timeIntervals={30} timeCaption="시작" dateFormat="HH:mm" placeholderText="시작 시간을 선택하세요" customInput={<StyledInput />} /></FormGroup>

          <FormGroup><Label>종료 시간</Label>
            <DatePicker selected={form.endTime ? new Date(`2000-01-01T${form.endTime}`) : null} onChange={(date) => setForm(prev => ({ ...prev, endTime: date.toTimeString().slice(0, 5) }))} showTimeSelect showTimeSelectOnly timeIntervals={30} timeCaption="종료" dateFormat="HH:mm" placeholderText="종료 시간을 선택하세요" customInput={<StyledInput />} /></FormGroup>

          <FormGroup><Label>우편번호</Label>
            <AddressRow>
              <Input name="zipCode" value={form.zipCode} readOnly placeholder="우편번호" />
              <Button type="button" onClick={handlePostcode}>우편번호 찾기</Button>
            </AddressRow></FormGroup>

          <FormGroup><Label>주소</Label>
            <Input name="basicAddress" value={form.basicAddress} readOnly placeholder="도로명 주소가 자동으로 입력됩니다." /></FormGroup>

          <FormGroup><Label>상세주소</Label>
            <Input name="detailAddress" value={form.detailAddress} onChange={handleChange} placeholder="예) OO아파트 OO동 OO호" /></FormGroup>

          <FormGroup><Label>찾아오시는 길</Label>
            <Input name="direction" value={form.direction} onChange={handleChange} placeholder="예) 편의점 뒷편에 있습니다." /></FormGroup>

        <SubmitButton onClick={handleSubmit}>
        {isEditMode ? '글 수정하기' : '글 올리기'}
        </SubmitButton>
        </FormWrapper>

        {showModal && (
          <ModalOverlay>
            <ModalBox>
              <ModalTitle>이대로 글을 올리시겠습니까?</ModalTitle>
              <ModalText>작성한 내용을 다시 한 번 확인해 주세요.</ModalText>
              <ModalButtons>
                <ModalButton cancel onClick={closeModal}>취소</ModalButton>
                <ModalButton onClick={submitToServer}>확인</ModalButton>
              </ModalButtons>
            </ModalBox>
          </ModalOverlay>
        )}

      </Content>
    </AppWrapper>
  );
};

export default Writing;

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
  background-color: ${props => props.cancel ? '#e0e0e0' : '#2B9E90'};
  color: ${props => props.cancel ? '#000' : '#fff'};
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 32px 16px;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 360px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  margin: 0 auto;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  margin: 0px 10px;
  font-size: 15px;
  color: #000000;
  text-align: left;
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  background: #F5F5F5;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a0d9c7;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  background: #F5F5F5;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a0d9c7;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  background: #F5F5F5;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a0d9c7;
  }
`;

const DatePickerInput = StyledInput;

const AddressRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Button = styled.button`
  width: 50%;
  height: 50px;
  padding: 10px;
  border-radius: 8px;
  background-color: #2B9E90;
  color: white;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2B9E90;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;
