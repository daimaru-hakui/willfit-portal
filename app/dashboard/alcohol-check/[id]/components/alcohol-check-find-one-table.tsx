"use client";
import { Button, Table } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import AlcoholCheckFindOneTableRow from "./alcohol-check-find-one-table-row";
import { useParams } from "next/navigation";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { AlcoholCheck } from "@/type";

const AlcoholCheckFindOneTable: FC = () => {
  const { id }:{id:string}= useParams();
  const [alcoholChecks, setAlcoholChecks] = useState<AlcoholCheck[]>([]);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    if (!id) return;
    const coll = collection(db, "alcoholCheckData");
    const q = query(
      coll,
      where("date", "==", id),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) =>
      setAlcoholChecks(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as AlcoholCheck)
        )
      )
    );
  }, [id]);

  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(db, "authority");
      const docSnap = await getDocs(usersRef);
      setUsers(docSnap.docs.map((doc) => ({ ...doc.data() })));
    };
    getUsers();
  }, []);

  return (
    <Table w="100%">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>名前</Table.Th>
          <Table.Th>アルコール検査</Table.Th>
          <Table.Th>酒気帯び</Table.Th>
          <Table.Th>数値</Table.Th>
          <Table.Th>提出時刻</Table.Th>
          <Table.Th>更新時刻</Table.Th>
          <Table.Th>編集</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {alcoholChecks.map((alcoholCheck) => (
          <AlcoholCheckFindOneTableRow
            key={alcoholCheck.id}
            alcoholCheck={alcoholCheck}
            users={users}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AlcoholCheckFindOneTable;
