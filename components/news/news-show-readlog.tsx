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
import { Box, Flex, Paper, Title } from "@mantine/core";
import { format } from "date-fns";
import { MdAccessTime } from "react-icons/md";

interface ReadLogUser extends ReadLog {
  user: User;
}

const NewsShowReadLog = () => {
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
        <Paper p="sm" mt={{ base: "sm", md: "md" }} shadow="sm">
          <Title order={4}>既読者</Title>
          <Box mt="sm">
            {readLogs.map((readLog) => (
              <Flex key={readLog.id} align="center" justify="space-between">
                <Box py={2}>{readLog.user.name}</Box>
                <Flex gap={5}>
                  <Flex align="center">
                    <MdAccessTime />
                  </Flex>
                  {readLog?.createdAt &&
                    format(
                      new Date(readLog?.createdAt?.toDate()),
                      "yyyy-MM-dd HH:mm"
                    )}
                </Flex>
              </Flex>
            ))}
          </Box>
        </Paper>
      )}
    </>
  );
};

export default NewsShowReadLog;
