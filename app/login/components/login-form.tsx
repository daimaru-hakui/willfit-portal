"use client";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { signIn } from "next-auth/react";
import {
  Box,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Stack,
} from "@mantine/core";
import { HiLockClosed } from "react-icons/hi";

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      await signIn("credentials", {
        idToken,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center" direction="column" w={300}>
        <Box>
          <Box ta="center">
            <HiLockClosed style={{ fontSize: "42" }} />
          </Box>
          <Text fw={700} ta="center" size="lg">
            Log in
          </Text>
        </Box>
        <Stack mt={16} gap={24} w="full">
          <TextInput
            type="email"
            label="email"
            placeholder="email"
            w="full"
            {...register("email", { required: true })}
          />
          <PasswordInput
            label="password"
            placeholder="password"
            w="full"
            {...register("password", { required: true })}
          />
          <Button type="submit" color="blue" fullWidth>
            ログイン
          </Button>
        </Stack>
      </Flex>
    </form>
  );
};

export default LoginForm;
