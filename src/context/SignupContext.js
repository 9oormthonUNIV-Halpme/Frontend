import { createContext, useContext, useState } from 'react';

const SignupContext = createContext(null);

export const SignupProvider = ({ children }) => {
const [form, setForm] = useState({
  name: '',
  phone: '',
  age: '',
  gender: '',
  zipcode: '',
  address: '',
  addressDetail: '',
  direction: '',
  email: '',
  password: '',
  confirmPassword: ''
});


  return (
    <SignupContext.Provider value={{ form, setForm }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};
