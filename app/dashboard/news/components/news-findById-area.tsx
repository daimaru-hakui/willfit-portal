"use client";
import { db } from "@/lib/firebase/client";
import { News, User } from "@/type";
import { Box, Button, Flex, Paper, Stack, Title } from "@mantine/core";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface NewsUser extends News {
  user: User;
}

const NewsFindByIdArea: FC = () => {
  const { id } = useParams();
  const [news, setNews] = useState<NewsUser>();

  useEffect(() => {
    const getNews = async () => {
      const docRef = doc(db, "willfitNews", `${id}`);
      const snapShot = await getDoc(docRef);
      const user = await getDoc(snapShot.data()?.createdBy.ref);
      setNews({
        ...snapShot.data(),
        id: snapShot.id,
        user: user.data(),
      } as NewsUser);
    };
    getNews();
  }, [id]);

  return (
    <Paper shadow="sm" p="md">
      <Flex align="center" justify="space-between">
        <Title order={2}>詳細</Title>
        <Link href="/dashboard/news">
          <Button size="xs" variant="outline">
            一覧へ
          </Button>
        </Link>
      </Flex>
      <Box fz="sm" ta="right">
        登録日: {news?.postDate}
      </Box>
      <Stack gap="md" mt="md">
        <Box>
          <Box fz="sm" fw="bold">
            タイトル
          </Box>
          <Box mt={2}>{news?.title}</Box>
        </Box>
        <Box>
          <Box fz="sm" fw="bold">
            内容
          </Box>
          <Box mt={2} style={{ whiteSpace: "pre-wrap" }}>
            {news?.content}
          </Box>
        </Box>
        <Flex align="center" justify="flex-end" gap="sm">
          <Box fz="sm">作成者</Box>
          <Box>{news?.user?.name}</Box>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default NewsFindByIdArea;
