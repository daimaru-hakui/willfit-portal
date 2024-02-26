"use client";
import { News, User } from "@/type";
import { Table, Box, Flex } from "@mantine/core";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { excerpt } from "@/utils/functions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

interface Props {
  news: News & { user: User };
}

const NewsToppageListRow: FC<Props> = ({ news }) => {
  const session = useSession();
  const uid = session.data?.user.uid;
  const [unRead, setUnRead] = useState(false);

  useEffect(() => {
    if (!uid) return;
    const getUnRead = async () => {
      const docRef = doc(db, "willfitNews", news.id, "readLogs", `${uid}`);
      const snapShot = await getDoc(docRef);
      if (snapShot.exists()) return;
      setUnRead(true);
    };
    getUnRead();
  }, [news.id, uid]);

  return (
    <Table.Tr fz="sm" w="100%">
      <Table.Td>{news?.postDate}</Table.Td>
      <Table.Td>
        <Flex align="center" gap="xs">
          <Link href={`/dashboard/news/${news.id}`}>
            {excerpt(news?.title, 25)}
          </Link>
          {unRead && (
            <Box w={5} h={5} bg="red" style={{ borderRadius: "50%" }}></Box>
          )}
        </Flex>
      </Table.Td>
      <Table.Td>{news?.user?.name}</Table.Td>
    </Table.Tr>
  );
};

export default NewsToppageListRow;
