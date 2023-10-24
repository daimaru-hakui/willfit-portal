import React from 'react';
import { NextPage } from 'next';
import LoginForm from './components/login-form';
import {Paper} from "@mantine/core"

const LoginPage: NextPage = () => {
  return (
    <Paper p={24} shadow='sm' bg='white'>
      <LoginForm />
    </Paper>
  );
};

export default LoginPage;