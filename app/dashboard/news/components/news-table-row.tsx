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
import { usePathname } from "next/navigation";
import { deleteObject, ref } from "firebase/storage";

interface Props {
  news: News & { user: User };
}

const NewsTableRow: FC<Props> = ({ news }) => {
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const pathname = usePathname();

  const excerpt = (str: string, len: number) => {
    if (str.length > len) {
      const result = str.substring(0, len);
      return result + "...";
    }
    return str;
  };

  const deleteNews = async (id: string) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "willfitNews", `${id}`);
    try {
      await deleteDoc(docRef);
      if(news.images.length === 0) return
      for (let { imagePath } of news?.images) {
        await deleteImage(imagePath);
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
      <Table.Td w={110}>{news?.postDate}</Table.Td>
      <Table.Td w={180}>
        <Link href={`/dashboard/news/${news.id}`}>
          {excerpt(news?.title, 10)}
        </Link>
      </Table.Td>
      <Table.Td>{excerpt(news?.content, 20)}</Table.Td>
      <Table.Td>{news?.user?.name}</Table.Td>
      <Table.Td>
        <Flex justify="center" align="center" gap="md">
          <Link href={`/dashboard/news/${news.id}`}>
            <Button size="xs">詳細</Button>
          </Link>
          {currentUser === news.user.uid && pathname === "/dashboard/news" && (
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
