"use client";
import { Button, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AlcoholCheckTableRow from "./alcohol-check-table-row";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const AlcoholCheckTable = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [alcoholChecks, setAlcoholChecks] = useState<any>([]);

  useEffect(() => {
    const getCount = async () => {
      const coll = collection(db, "alcoholCheckList");
      const snapshot = await getCountFromServer(coll);
      setTotalCount(snapshot.data().count);
    };
    getCount();
  }, []);

  useEffect(() => {
    const getAlcoholCheckList = async () => {
      const collectionRef = collection(db, "alcoholCheckList");
      const q = query(collectionRef, orderBy("id", "desc"), limit(10));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAlcoholChecks(data);
    };
    getAlcoholCheckList();
  }, []);

  console.log(totalCount);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>日付</Table.Th>
          <Table.Th>提出</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {alcoholChecks.map((alcoholCheck:any) => (
          <AlcoholCheckTableRow key={alcoholCheck.id} alcoholCheck={alcoholCheck}/>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AlcoholCheckTable;
