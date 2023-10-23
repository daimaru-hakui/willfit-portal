'use client';
import React, { FC } from 'react';
import { Button, Input } from '../../lib/material-tailwind';
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signOut } from 'next-auth/react';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInHandler(data);
  };

  const signInHandler = async (data: Inputs) => {
    const { email, password } = data;
    try {
      const userCredential =
        await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log(idToken);
      await signIn('credentials', {
        idToken,
        callbackUrl: '/dashboard'
      });

    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-6 place-items-center'>
        <div>login</div>
        <Input
          label='email'
          type='email'
          crossOrigin={undefined}
          {...register('email', { required: true })}
        />
        <Input
          label='password'
          type='password'
          crossOrigin={undefined}
          {...register('password', { required: true })}
        />
        <Button type='submit' color="blue" fullWidth>ログイン</Button>
        <Button type='button' color="blue" fullWidth onClick={logout}>ログアウト</Button>
      </div>
    </form>
  );
};

export default LoginForm;