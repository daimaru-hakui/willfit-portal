"use client";
import { db, storage } from "@/lib/firebase/client";
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
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";

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
  const [fileUpload, setFileUpload] = useState<File[] | undefined | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files);
    setFileUpload(Array.from(e.target.files));
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const previewDelete = (idx: number) => {
    const newFiles = fileUpload?.filter((_, index) => index !== idx);
    setFileUpload(newFiles);
  };

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
      const doc = await addDoc(newsRef, {
        postDate: data.postDate,
        title: data.title,
        content: data.content,
        createdAt: serverTimestamp(),
        createdBy: {
          ref: userRef,
        },
      });
      addImage(doc.id);
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

  const addImage = async (id: string) => {
    if (fileUpload?.length === 0) return;
    fileUpload?.forEach((file) => {
      const fileName = file.name;
      const storageRef = ref(storage, `willfit-images/news/${id}/${fileName}`);
      uploadBytes(storageRef, file).then(async () => {
        const url = await getDownloadURL(storageRef);
        const docRef = doc(db, "willfitNews", id);
        updateDoc(docRef, {
          images: arrayUnion({
            imageUrl: url,
            imagePath: storageRef.fullPath,
          }),
        });
      });
    });
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
        <Stack gap="md">
          <TextInput label="日付" type="date" {...register("postDate")} />
          <TextInput label="タイトル" {...register("title")} />
          <Textarea label="内容" {...register("content")} autosize></Textarea>
          <Box>
            {fileUpload &&
              fileUpload.length >= 1 &&
              fileUpload.map((file, idx) => (
                <Box key={file.name} pos="relative" mt="md">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={300}
                    height={300}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <IoCloseCircle
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      cursor: "pointer",
                      fontSize: 30,
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                    onClick={() => previewDelete(idx)}
                  />
                </Box>
              ))}
          </Box>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFile}
            style={{ display: "none" }}
          />
          <Button mx="auto" color="gray" w="150px" onClick={handleClick}>
            画像を選択
          </Button>
        </Stack>
        <Button type="submit" fullWidth>
          {pageType === "NEW" ? "投稿する" : "更新する"}
        </Button>
      </Stack>
    </Box>
  );
};

export default NewsForm;
