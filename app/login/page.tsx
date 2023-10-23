import React from 'react';
import { NextPage } from 'next';
import LoginForm from './components/login-form';

const LoginPage: NextPage = () => {
  return (
    <div className='p-6 rounded-md shadow-md border-t-4 border-t-blue-500'>
      <LoginForm />
    </div>
  );
};

export default LoginPage;