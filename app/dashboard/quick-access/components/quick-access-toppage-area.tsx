"use client";
import React, { useEffect, useState } from "react";
import QuickAccessToppageHeader from "./quick-access-toppage-header";
import QuickAccessToppageTabList from "./quick-access-toppage-tabList";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { QuickAccessLink } from "@/type";

const QuickAccessToppageArea = () => {
  const [quickAccessLinks, setQuickAccessLinks] = useState<QuickAccessLink[]>(
    []
  );
  useEffect(() => {
    const getQuickAccessLinks = async () => {
      const coll = collection(db, "willfitQuickAccessLinks");
      const q = query(coll, orderBy("title", "asc"));
      onSnapshot(q, (snapShot) => {
        setQuickAccessLinks(
          snapShot.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
              } as QuickAccessLink)
          )
        );
      });
    };
    getQuickAccessLinks()
  }, []);

  return (
    <>
      <QuickAccessToppageHeader />
      <QuickAccessToppageTabList quickAccessLinks={quickAccessLinks} />
    </>
  );
};

export default QuickAccessToppageArea;
