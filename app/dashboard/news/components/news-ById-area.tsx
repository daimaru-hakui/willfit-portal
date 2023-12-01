"use client";
import { db } from "@/lib/firebase/client";
import { News, User } from "@/type";
import { Box, Button, Flex, Paper, Stack, Title } from "@mantine/core";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface NewsUser extends News {
  user: User;
}

const NewsByIdArea: FC = () => {
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
      <Link href="/dashboard/news">
        <Button size="xs" variant="outline">
          一覧へ
        </Button>
      </Link>
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

export default NewsByIdArea;
