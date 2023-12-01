"use client";
import { Paper } from "@mantine/core";
import React, { FC, useEffect } from "react";
import NewsTable from "./news-table";
import NewsHeader from "./news-header";
import { useStore } from "@/store";
import {
  collection,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { News, User } from "@/type";
import { db } from "@/lib/firebase/client";

interface NewsUser extends News {
  user: User;
}

const NewsArea: FC = () => {
  const newsList = useStore((state) => state.newsList);
  const setNewsList = useStore((state) => state.setNewsList);

  useEffect(() => {
    const getNews = async () => {
      const coll = collection(db, "willfitNews");
      const q = query(coll, orderBy("createdAt", "desc"), limit(100));
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
    <Paper shadow="sm" p="md">
      <NewsHeader />
      <NewsTable newsList={newsList} />
    </Paper>
  );
};

export default NewsArea;
