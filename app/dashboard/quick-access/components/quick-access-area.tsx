"use client";
import React, { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import QuickAccessTable from "./quick-access-table";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { QuickAccessLink } from "@/type";
import QuickAccessHeader from "./quick-access-header";

const QuickAccessArea = () => {
  const [quickAccessLinks, setQuickAccessLinks] = useState<QuickAccessLink[]>(
    []
  );
  useEffect(() => {
    const getQuickAccessLinks = async () => {
      const coll = collection(db, "willfitQuickAccessLinks");
      const q = query(coll, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        setQuickAccessLinks(
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as QuickAccessLink)
          )
        );
      });
    };
    getQuickAccessLinks();
  }, []);

  return (
    <Paper p="md" w="100%" bg="white" shadow="sm">
      <QuickAccessHeader />
      <QuickAccessTable quickAccessLinks={quickAccessLinks} />
    </Paper>
  );
};

export default QuickAccessArea;
