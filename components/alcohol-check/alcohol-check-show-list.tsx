"use client";
import { Table } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { AlcoholCheck, User } from "@/type";
import AlcoholCheckShowListRow from "./alcohol-check-show-list-row";
import AlcoholCheckShowOldListRow from "./alcohol-check-show-old-list-row";

const AlcoholCheckShowList: FC = () => {
  const { dateId }: { dateId: string } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [alcoholChecks, setAlcoholChecks] = useState<
    (AlcoholCheck & { user: User })[]
  >([]);
  const [oldAlcoholChecks, setOldAlcoholChecks] = useState<AlcoholCheck[]>([]);

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

  useEffect(() => {
    if (!dateId) return;
    const coll = collection(db, "alcoholCheckData");
    const q = query(
      coll,
      where("date", "==", dateId),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) =>
      setOldAlcoholChecks(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as AlcoholCheck)
        )
      )
    );
  }, [dateId]);

  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(db, "authority");
      const docSnap = await getDocs(usersRef);
      setUsers(docSnap.docs.map((doc) => ({ ...doc.data() } as User)));
    };
    getUsers();
  }, []);

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
        {oldAlcoholChecks.length === 0
          ? alcoholChecks.map((alcoholCheck) => (
              <AlcoholCheckShowListRow
                key={alcoholCheck.id}
                alcoholCheck={alcoholCheck}
              />
            ))
          : oldAlcoholChecks.map((alcoholCheck) => (
              <AlcoholCheckShowOldListRow
                key={alcoholCheck.id}
                dateId={dateId}
                alcoholCheck={alcoholCheck}
                users={users}
              />
            ))}
      </Table.Tbody>
    </Table>
  );
};

export default AlcoholCheckShowList;
