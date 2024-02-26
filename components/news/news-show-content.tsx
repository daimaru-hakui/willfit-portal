"use client";
import { db } from "@/lib/firebase/client";
import { News, User } from "@/type";
import { Box, Button, Flex, Paper, Stack, Title } from "@mantine/core";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewsShowContent = () => {
  const { id } = useParams();
  const session = useSession();
  const uid = session.data?.user.uid;
  const [news, setNews] = useState<News & { user: User }>();

  useEffect(() => {
    const getNews = async () => {
      const docRef = doc(db, "willfitNews", `${id}`);
      const snapShot = await getDoc(docRef);
      const user = await getDoc(snapShot.data()?.createdBy.ref);
      setNews({
        ...snapShot.data(),
        id: snapShot.id,
        user: user.data(),
      } as News & { user: User });
    };
    getNews();
  }, [id]);

  useEffect(() => {
    if (!uid) return;
    const getRead = async () => {
      const docRef = doc(db, "willfitNews", `${id}`, "readLogs", `${uid}`);
      const userRef = doc(db, "authority", `${uid}`);
      try {
        const snapShot = await getDoc(docRef);
        if (snapShot.exists()) return;
        setDoc(docRef, {
          createdAt: serverTimestamp(),
          createdBy: {
            ref: userRef,
          },
        });
      } catch (err) {
        console.error(err);
      }
    };
    getRead();
  }, [id, uid]);

  return (
    <Paper shadow="sm" p="md">
      <Flex justify="space-between">
        <Link href="/dashboard/news">
          <Button size="xs" variant="outline">
            一覧へ
          </Button>
        </Link>
      </Flex>
      <Flex align="center" justify="space-between">
        <Title mt="xs" order={2}>
          {news?.title}
        </Title>
      </Flex>
      <Box mt={5} fz="xs" ta="left">
        登録日: {news?.postDate}
      </Box>
      <Stack gap="md" mt="md">
        <Box>
          <Box mt="sm" style={{ whiteSpace: "pre-wrap" }}>
            {news?.content}
          </Box>
        </Box>
        {news?.images?.map((image) => (
          <>
            {image.type === "application/pdf" ? (
              <Link href={image.url} target="_blank" rel="noopener noreferrer">
                <Box>{image.name}</Box>
              </Link>
            ) : (
              <Box key={image.url}>
                <Image
                  src={image.url}
                  width={200}
                  height={200}
                  alt={image.name}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            )}
          </>
        ))}
        <Flex align="center" justify="flex-end" gap="sm">
          <Box fz="sm">作成者</Box>
          <Box>{news?.user?.name}</Box>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default NewsShowContent;
