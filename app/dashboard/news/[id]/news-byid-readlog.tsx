"use client";
import { db } from "@/lib/firebase/client";
import { ReadLog, User } from "@/type";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box, Flex } from "@mantine/core";

interface ReadLogUser extends ReadLog {
  user: User;
}

const NewsByIdReadLog = () => {
  const { id } = useParams();
  const session = useSession();
  const uid = session.data?.user.uid;
  const [readLogs, setReadLogs] = useState<ReadLogUser[]>([]);

  useEffect(() => {
    if (!uid) return;
    const getReadLogs = async () => {
      const coll = collection(db, "willfitNews", `${id}`, "readLogs");
      const q = query(coll, orderBy("createdAt", "desc"));
      try {
        onSnapshot(q, async (snapShot) => {
          let data: ReadLogUser[] = [];
          for (let doc of snapShot.docs) {
            const user = await getDoc(doc.data().createdBy.ref);
            data.push({
              ...doc.data(),
              id: doc.id,
              user: user.data(),
            } as ReadLogUser);
          }
          setReadLogs(data);
        });
      } catch (err) {
        console.error(err);
      }
    };
    getReadLogs();
  }, [id, uid]);

  return (
    <>
      {readLogs.length > 0 && (
        <Flex mt="sm" direction="row" gap="sm">
          {readLogs.map((readLog) => (
            <Box
              key={readLog.id}
              px="xs"
              py={2}
              bg="cyan"
              style={{ borderRadius: "6px", color: "white" }}
            >
              {readLog.user.name}
            </Box>
          ))}
        </Flex>
      )}
    </>
  );
};

export default NewsByIdReadLog;
