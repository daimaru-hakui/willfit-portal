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
import { excerpt } from "@/utils/functions";

interface Props {
  news: News & { user: User };
}

const NewsToppageTableRow: FC<Props> = ({ news }) => {
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const pathname = usePathname();

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
    <Table.Tr fz="sm" w="100%">
      <Table.Td>{news?.postDate}</Table.Td>
      <Table.Td>
        <Link href={`/dashboard/news/${news.id}`}>
          {excerpt(news?.title, 25)}
        </Link>
      </Table.Td>
      <Table.Td>{news?.user?.name}</Table.Td>
    </Table.Tr>
  );
};

export default NewsToppageTableRow;
