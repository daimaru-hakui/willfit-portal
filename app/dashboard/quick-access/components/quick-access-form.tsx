"use client";
import { db, storage } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { News } from "@/type";
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
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";

type Inputs = {
  id: string;
  category: string;
  title: string;
  link: string;
};

interface Props {
  pageType: "NEW" | "EDIT";
  defaultValues: Inputs;
  close?: () => void;
  news?: News;
}

const QuickAccessForm: FC<Props> = ({
  pageType,
  defaultValues,
  close,
  news,
}) => {
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
        close!();
        return;
    }
  };

  const addNews = async (data: Inputs) => {
    const newsRef = collection(db, "willfitNews");
    const userRef = doc(db, "authority", `${session.data?.user.uid}`);
    setIsLoading(true);
    try {
      const doc = await addDoc(newsRef, {
        title: data.title,

        createdAt: serverTimestamp(),
        createdBy: {
          ref: userRef,
        },
        images: [],
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
        title: data.title,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
      alert("更新を失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (path: string, idx: number) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    const newImages = news?.images.filter((_, index) => index !== idx);
    const docRef = doc(db, "willfitNews", `${news?.id}`);
    const desertRef = ref(storage, path);
    deleteObject(desertRef)
      .then(() => {
        updateDoc(docRef, {
          images: newImages,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={24}>
        <Flex align="center" justify="space-between">
          {pageType === "NEW" ? (
            <>
              <Title order={2}>登録する</Title>
              <Link href="/dashboard/quick-access">
                <Button size="xs" variant="outline">
                  一覧へ
                </Button>
              </Link>
            </>
          ) : (
            <Title order={2}>編集する</Title>
          )}
        </Flex>
        <Stack gap="md">
          <TextInput label="タイトル" {...register("title")} />
          <TextInput label="リンク" {...register("link")} />
        </Stack>
        <Button type="submit" fullWidth>
          {pageType === "NEW" ? "投稿する" : "更新する"}
        </Button>
      </Stack>
    </Box>
  );
};

export default QuickAccessForm;
