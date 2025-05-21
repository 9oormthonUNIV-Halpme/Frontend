import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../context/SignupContext';

import {
  Container,
  Title,
  Input,
  Row,
  Label,
  GenderButton,
  AddressRow,
  SearchIcon,
  ConfirmButton,
  Footer,
  LinkText
} from './SignupStyles';

const Signup = () => {
  const navigate = useNavigate(); // ← 주소 페이지로 이동용
  const { form, setForm } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔍 주소 페이지에서 선택한 주소 불러오기
  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedAddress');
    if (savedAddress) {
      setForm(prev => ({ ...prev, address: savedAddress }));
      localStorage.removeItem('selectedAddress');
    }
  }, [setForm]);

  return (
    <Container>
      <Title>회원가입</Title>

      <Label>이름</Label>
      <Input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름을 입력하세요"
      />

      <Label>전화번호</Label>
      <Input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="010-1234-5678"
      />

      <Row>
        {/* 나이 입력 */}
        <div style={{ flex: 1 }}>
          <Label style={{ marginTop: '16px' }}>나이</Label>
          <Input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="6자리를 입력해주세요"
          />
        </div>

        {/* 성별 선택 */}
        <div style={{ marginLeft: 12 }}>
          <Label style={{ marginTop: '16px' }}>성별</Label>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <GenderButton
              selected={form.gender === '남'}
              onClick={() => setForm(prev => ({ ...prev, gender: '남' }))}
            >
              남
            </GenderButton>
            <GenderButton
              selected={form.gender === '여'}
              onClick={() => setForm(prev => ({ ...prev, gender: '여' }))}
            >
              여
            </GenderButton>
          </div>
        </div>
      </Row>

      <Label>주소</Label>
      <AddressRow>
        <Input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="주소를 입력하세요"
        />
        <SearchIcon onClick={() => navigate('/search-address')}>🔍</SearchIcon>
      </AddressRow>

      <Label>이메일</Label>
      <Input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="이메일을 입력하세요"
      />

      <Label>비밀번호</Label>
      <Input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="........"
      />

      <Label>비밀번호 확인</Label>
      <Input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="........"
      />

      <ConfirmButton>확인</ConfirmButton>

      <Footer>
        계정이 있으신가요? <LinkText href="/login">로그인</LinkText>
      </Footer>
    </Container>
  );
};

export default Signup;
