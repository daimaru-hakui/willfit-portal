"use client";
import { Paper } from "@mantine/core";
import React, { FC, useEffect } from "react";
import NewsHeader from "./news-header";
import NewsToppageTable from "./news-toppage-table";
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
import { News, User } from "@/type";

interface NewsUser extends News {
  user: User;
}

const NewsToppageArea: FC = () => {
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
    <>
      {newsList.length > 0 && (
        <Paper shadow="sm" p="md">
          <NewsHeader />
          <NewsToppageTable newsList={newsList} />
        </Paper>
      )}
    </>
  );
};

export default NewsToppageArea;
