"use client";
import { Button, Flex, Table } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import NewsListRow from "./news-list-row";
import { News, User } from "@/type";
import { useStore } from "@/store";
import {
  collection,
  getCountFromServer,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const NewsList: FC = () => {
  const newsList = useStore((state) => state.newsList);
  const setNewsList = useStore((state) => state.setNewsList);
  const [createdAtEnd, setCreatedAtEnd] = useState<string | null>(null);
  const [totalNews, setTotalNews] = useState(0);

  useEffect(() => {
    const getNews = async () => {
      const coll = collection(db, "willfitNews");
      const q = query(coll, orderBy("createdAt", "desc"), limit(10));
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
        setNewsList(array);
        setCreatedAtEnd(array?.at(-1)?.createdAt.toDate());
      });
    };
    getNews();
  }, [setNewsList]);

  const getNextNews = () => {
    if (!createdAtEnd) return;
    const coll = collection(db, "willfitNews");
    const q = query(
      coll,
      orderBy("createdAt", "desc"),
      startAfter(createdAtEnd),
      limit(10)
    );
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
      setNewsList([...newsList, ...array]);
      const result = array?.at(-1)?.createdAt.toDate();
      if (!result) {
        setCreatedAtEnd(null);
      } else {
        setCreatedAtEnd(result);
      }
    });
  };

  useEffect(() => {
    const getTotalNews = async () => {
      const coll = collection(db, "willfitNews");
      const snapshot = await getCountFromServer(coll);
      setTotalNews(snapshot.data().count || 0);
    };
    getTotalNews();
  }, []);

  return (
    <>
      <Table.ScrollContainer minWidth="1000px" type="native">
        <Table mt="md" w="100%">
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
              <NewsListRow key={news.id} news={news} />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {totalNews && totalNews > newsList.length && (
        <Flex justify="center" mt={12}>
          <Button onClick={getNextNews}>もっと見る</Button>
        </Flex>
      )}
    </>
  );
};

export default NewsList;
