"use client";
import { db } from "@/lib/firebase/client";
import { useStore } from "@/store";
import {
  Box,
  Button,
  Flex,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  id: string;
  postDate: string;
  title: string;
  content: string;
};

interface Props {
  pageType: "NEW" | "EDIT";
  defaultValues: Inputs;
  close?: () => void;
}

const NewsForm: FC<Props> = ({ pageType, defaultValues, close }) => {
  const session = useSession();
  const router = useRouter();
  const setIsLoading = useStore((state) => state.setIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    switch (pageType) {
      case "NEW":
        await addNews(data);
        return;
      case "EDIT":
        await updateNews(data);
        close && close();
        return;
    }
  };

  const addNews = async (data: Inputs) => {
    const newsRef = collection(db, "willfitNews");
    const userRef = doc(db, "authority", `${session.data?.user.uid}`);
    setIsLoading(true);
    try {
      await addDoc(newsRef, {
        postDate: data.postDate,
        title: data.title,
        content: data.content,
        createdAt: serverTimestamp(),
        createdBy: {
          ref: userRef,
        },
      });
      router.push("/dashboard/news");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNews = async (data: Inputs) => {
    const result = confirm("更新して宜しいでしょうか");
    if (!result) return;
    setIsLoading(true);
    const newRef = doc(db, "willfitNews", data.id);
    try {
      updateDoc(newRef, {
        postDate: data.postDate,
        title: data.title,
        content: data.content,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
      alert("更新を失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={24}>
        <Flex align="center" justify="space-between">
          <Title order={2}>
            {pageType === "NEW" ? "投稿する" : "編集する"}
          </Title>
          <Link href="/dashboard/news">
            <Button size="xs" variant="outline">
              一覧へ
            </Button>
          </Link>
        </Flex>
        <Stack gap={6}>
          <TextInput label="日付" type="date" {...register("postDate")} />
          <TextInput label="タイトル" {...register("title")} />
          <Textarea label="内容" {...register("content")} autosize></Textarea>
        </Stack>
        <Button type="submit" fullWidth>
          {pageType === "NEW" ? "投稿する" : "更新する"}
        </Button>
      </Stack>
    </Box>
  );
};

export default NewsForm;
