"use client";
import { Box, Table } from "@mantine/core";
import React, { FC, useEffect } from "react";
import { News, User } from "@/type";
import NewsToppageListRow from "./news-toppage-list-row";
import { useStore } from "@/store";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const NewsToppageList: FC = () => {
  const newsLimit = useStore((state) => state.newsLimit);
  const setNewsLimit = useStore((state) => state.setNewsLimit);

  useEffect(() => {
    const getNews = async () => {
      const coll = collection(db, "willfitNews");
      const q = query(coll, orderBy("createdAt", "desc"), limit(5));
      onSnapshot(q, async (snapshot) => {
        let array: (News & { user: User })[] = [];
        for (let doc of snapshot.docs) {
          const userDoc = await getDoc(doc.data()?.createdBy.ref);
          const data = {
            ...doc.data(),
            id: doc.id,
            user: userDoc.data(),
          } as News & { user: User };
          array.push(data);
        }
        setNewsLimit(array);
      });
    };
    getNews();
  }, [setNewsLimit]);
  
  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt="md" w="100%" miw={500}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>日付</Table.Th>
            <Table.Th>タイトル</Table.Th>
            <Table.Th>作成者</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {newsLimit.map((news) => (
            <NewsToppageListRow key={news.id} news={news} />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default NewsToppageList;
