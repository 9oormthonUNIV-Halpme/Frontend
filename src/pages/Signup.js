import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../context/SignupContext';

const Signup = () => {
  const navigate = useNavigate();
  const { form, setForm } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handlePostcode = () => {
  new window.daum.Postcode({
    oncomplete: function (data) {
      let addr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      setForm(prev => ({
        ...prev,
        zipcode: data.zonecode,
        address: addr
      }));
    },
  }).open();
};


  const handleConfirm = () => {
  const { name, phone, age, gender, address, email, password, confirmPassword } = form;

  if (!name.trim()) return alert('이름을 입력해주세요.');
  if (!phone.trim()) return alert('전화번호를 입력해주세요.');
  if (!age.trim()) return alert('나이를 입력해주세요.');
  if (!gender.trim()) return alert('성별을 선택해주세요.');
  if (!address.trim()) return alert('주소를 입력해주세요.');
  if (!email.trim()) return alert('이메일을 입력해주세요.');
  if (!password.trim()) return alert('비밀번호를 입력해주세요.');
  if (!confirmPassword.trim()) return alert('비밀번호 확인을 입력해주세요.');
  if (password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');

  // 모든 입력값이 유효할 경우 로그인 페이지로 이동
  alert('회원가입이 완료되었습니다!');
  navigate('/');
};

  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedAddress');
    if (savedAddress) {
      setForm(prev => ({ ...prev, address: savedAddress }));
      localStorage.removeItem('selectedAddress');
    }
  }, [setForm]);

  useEffect(() => {
  const script = document.createElement('script');
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  script.async = true;
  document.body.appendChild(script);
}, []);


  return (
    <AppWrapper>
      <Content>
        <FormWrapper>
                 <Title>회원가입</Title>

          <FormGroup>
            <Label>이름</Label>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="이름을 입력하세요" />
          </FormGroup>

          <FormGroup>
            <Label>전화번호</Label>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="010-1234-5678" />
          </FormGroup>

          <Row>
            <FormGroup style={{ flex: 1 }}>
              <Label>나이</Label>
              <Input name="age" value={form.age} onChange={handleChange} placeholder="6자리를 입력해주세요" />
            </FormGroup>

            <FormGroup>
              <Label>성별</Label>
              <GenderRow>
                <GenderButton selected={form.gender === '남'} onClick={() => setForm(prev => ({ ...prev, gender: '남' }))}>남</GenderButton>
                <GenderButton selected={form.gender === '여'} onClick={() => setForm(prev => ({ ...prev, gender: '여' }))}>여</GenderButton>
              </GenderRow>
            </FormGroup>
          </Row>

          <FormGroup>
            <Label>우편번호</Label>
            <AddressRow>
              <Input
                name="zipcode"
                value={form.zipcode || ''}
                readOnly
                placeholder="우편번호"
              />
              <DongButton type="button" onClick={handlePostcode}>우편번호 찾기</DongButton>
            </AddressRow>
          </FormGroup>

          <FormGroup>
            <Label>주소</Label>
            <Input
              name="address"
              value={form.address || ''}
              readOnly
              placeholder="기본 주소"
            />
          </FormGroup>

          <FormGroup>
            <Label>상세주소</Label>
            <Input
              name="addressDetail"
              value={form.addressDetail || ''}
              onChange={handleChange}
              placeholder="예) ㅇㅇ빌라 ㅇㅇ동 ㅇㅇ 호"
            />
          </FormGroup>

          <FormGroup>
            <Label>찾아오시는 길</Label>
            <Input name="direction" value={form.direction} onChange={handleChange} placeholder="예) 편의점 뒷편에 있습니다." />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <Input name="email" value={form.email} onChange={handleChange} placeholder="이메일을 입력하세요" />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="........" />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="........" />
          </FormGroup>

          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>

          <Footer>
            계정이 있으신가요? <BoldLink to="/">로그인</BoldLink>
          </Footer>
        </FormWrapper>
      </Content>
    </AppWrapper>
  );
};

export default Signup;

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
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
  text-align: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700; /* Bold */
  margin-bottom: 20px;
  color: #000000; /* Text_Main */
  text-align: left;
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
  font-size: 14px;
  color: #000000;
  text-align: left;
  display: block;
`;
const DongButton = styled.button`
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #2B9E90;
  background-color: #ffffff;
  color: #2B9E90;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #e6f7f5;
  }
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

const Row = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const GenderRow = styled.div`
  display: flex;
  gap: 8px;
`;

const GenderButton = styled.button`
  padding: 10px 16px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: ${({ selected }) => (selected ? '#000' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 14px;
  cursor: pointer;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchIcon = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #2B9E90;
  color: white;
  margin-top: 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3EC6B4;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin: 24px 0;
  font-size: 14px;
  color: #888888;
`;

const BoldLink = styled(Link)`
  color: #000000;
  font-weight: bold;
  margin-left: 4px;
  text-decoration: none;
`;
