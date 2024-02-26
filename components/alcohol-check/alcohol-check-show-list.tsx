"use client";
import { Table } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { AlcoholCheck, User } from "@/type";
import AlcoholCheckListRow from "./alcohol-check-show-list-row";

const AlcoholCheckShowList: FC = () => {
  const { dateId }: { dateId: string } = useParams();
  const [alcoholChecks, setAlcoholChecks] = useState<
    (AlcoholCheck & { user: User })[]
  >([]);

  useEffect(() => {
    if (!dateId) return;
    const coll = collection(db, "alcoholCheckList", dateId, "alcoholCheckData");
    const q = query(coll, orderBy("createdAt", "desc"));

    onSnapshot(q, async (snapshot) => {
      let data: (AlcoholCheck & { user: User })[] = [];
      for await (let doc of snapshot.docs) {
        if (!doc.data().userRef) return;
        const user = await getDoc(await doc.data().userRef);
        data.push({
          ...doc.data(),
          id: doc.id,
          user: user?.data(),
        } as AlcoholCheck & { user: User });
      }
      setAlcoholChecks(data);
    });
  }, [dateId]);

  return (
    <Table w="100%">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>名前</Table.Th>
          <Table.Th ta="center">アルコール検査</Table.Th>
          <Table.Th ta="center">酒気帯び</Table.Th>
          <Table.Th>数値</Table.Th>
          <Table.Th>提出時刻</Table.Th>
          <Table.Th>更新時刻</Table.Th>
          <Table.Th>編集</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {alcoholChecks.map((alcoholCheck) => (
          <AlcoholCheckListRow
            key={alcoholCheck.id}
            alcoholCheck={alcoholCheck}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AlcoholCheckShowList;
