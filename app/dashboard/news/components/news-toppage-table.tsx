"use client";
import { Box, Table } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import NewsTableRow from "./news-table-row";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { News, User } from "@/type";
import { useStore } from "@/store";

interface NewsUser extends News {
  user: User;
}

const NewsToppageTable: FC = () => {
  const newsList = useStore((state) => state.newsList);
  const setNewsList = useStore((state) => state.setNewsList);

  useEffect(() => {
    const getNews = async () => {
      const coll = collection(db, "willfitNews");
      const q = query(coll, orderBy("createdAt", "desc"), limit(5));
      onSnapshot(q, async (snapshot) => {
        let array: NewsUser[] = [];
        for (let doc of snapshot.docs) {
          const userDoc = await getDoc(doc.data()?.createdBy.ref);
          const data = {
            ...doc.data(),
            id: doc.id,
            user: userDoc.data(),
          } as NewsUser;
          array.push(data);
        }
        setNewsList(array);
      });
    };
    getNews();
  }, [setNewsList]);

  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt="md" w="800px">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>日付</Table.Th>
            <Table.Th>タイトル</Table.Th>
            <Table.Th>内容</Table.Th>
            <Table.Th>作成者</Table.Th>
            <Table.Th w={100}>アクション</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {newsList.map((news) => (
            <NewsTableRow key={news.id} news={news} />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default NewsToppageTable;
