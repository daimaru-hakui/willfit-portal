"use client";
import { News, User } from "@/type";
import { Button, Flex, Table } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";
import NewsEditModal from "./news-edit-modal";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/client";
import { useSession } from "next-auth/react";
import { deleteObject, ref } from "firebase/storage";
import { excerpt } from "@/utils/functions";

interface Props {
  news: News & { user: User };
}

const NewsTableRow: FC<Props> = ({ news }) => {
  const session = useSession();
  const currentUser = session.data?.user.uid;

  const deleteNews = async (id: string) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "willfitNews", `${id}`);
    try {
      await deleteDoc(docRef);
      if (news.images.length === 0) return;
      for (let { path } of news?.images) {
        await deleteImage(path);
      }
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました");
    }
  };

  const deleteImage = async (path: string) => {
    const desertRef = ref(storage, path);
    await deleteObject(desertRef);
  };

  return (
    <Table.Tr fz="sm">
      <Table.Td w={120}>{news?.postDate}</Table.Td>
      <Table.Td w={320}>
        <Link href={`/dashboard/news/${news.id}`}>
          {excerpt(news?.title, 20)}
        </Link>
      </Table.Td>
      <Table.Td w={400}>{excerpt(news?.content, 22)}</Table.Td>
      <Table.Td w={150}>{news?.user?.name}</Table.Td>
      <Table.Td>
        <Flex justify="flex-start" align="center" gap="md">
          <Link href={`/dashboard/news/${news.id}`}>
            <Button size="xs">詳細</Button>
          </Link>
          {currentUser === news.user.uid && (
            <>
              <NewsEditModal news={news} />
              <AiOutlineDelete
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => deleteNews(news.id)}
              />
            </>
          )}
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
};

export default NewsTableRow;
