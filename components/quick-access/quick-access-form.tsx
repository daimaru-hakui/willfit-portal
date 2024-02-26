"use client";
import { db } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { News } from "@/type";
import { quickAccessCategoryList } from "@/utils/quick-access-category-list";
import {
  Box,
  Button,
  Flex,
  Stack,
  TextInput,
  Title,
  Select,
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
  category: string;
  title: string;
  link: string;
};

interface Props {
  pageType: "NEW" | "EDIT";
  defaultValues: Inputs;
  close?: () => void;
}

const QuickAccessForm: FC<Props> = ({ pageType, defaultValues, close }) => {
  const session = useSession();
  const router = useRouter();
  const setIsLoading = useStore((state) => state.setIsLoading);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    switch (pageType) {
      case "NEW":
        await addQuickAccess(data);
        return;
      case "EDIT":
        await updateQuickAccess(data);
        close!();
        return;
    }
  };

  const handleSelectChange = (e: string | null) => {
    const value = e ? e : "";
    setValue("category", value);
  };

  const addQuickAccess = async (data: Inputs) => {
    const newsRef = collection(db, "willfitQuickAccessLinks");
    const userRef = doc(db, "authority", `${session.data?.user.uid}`);
    setIsLoading(true);
    try {
      await addDoc(newsRef, {
        category: data.category,
        title: data.title,
        link: data.link,
        createdAt: serverTimestamp(),
        createdBy: {
          ref: userRef,
        },
      });
      router.push("/dashboard/quick-access");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuickAccess = async (data: Inputs) => {
    const result = confirm("更新して宜しいでしょうか");
    if (!result) return;
    setIsLoading(true);
    const newRef = doc(db, "willfitQuickAccessLinks", data.id);
    const userRef = doc(db, "authority", `${session.data?.user.uid}`);
    try {
      updateDoc(newRef, {
        category: data.category,
        title: data.title,
        link: data.link,
        updatedAt: serverTimestamp(),
        updatedBy: {
          ref: userRef,
        },
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
          <Select
            label="カテゴリー"
            data={quickAccessCategoryList}
            value={watch("category")}
            onChange={(e) => handleSelectChange(e)}
          />
          <TextInput label="タイトル" {...register("title")} />
          <TextInput label="リンク" {...register("link")} />
        </Stack>
        <Button type="submit" fullWidth>
          {pageType === "NEW" ? "登録する" : "更新する"}
        </Button>
      </Stack>
    </Box>
  );
};

export default QuickAccessForm;
