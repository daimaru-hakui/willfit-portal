"use client";
import React, { FC, useEffect, useState } from "react";
import { Box, Flex, Paper } from "@mantine/core";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import AlcoholCheckModal from "./alcohol-check-modal";

const AlcoholCheckArea: FC = () => {
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const session = useSession();
  const currentUser = session.data?.user.uid || null;
  const [isAlcoholCheck, setIsAlcoholCheck] = useState(true);

  const defaultValues = {
    alcoholCheck1: "2",
    alcoholCheck2: "2",
    alcoholCheckValue: 0,
  };

  useEffect(() => {
    if (!currentUser) return;
    const docRef = doc(db, "alcoholCheckList", todayDate);
    onSnapshot(docRef, (querySnapshot) => {
      setIsAlcoholCheck(
        { ...querySnapshot.data() }.member.includes(currentUser)
      );
    });
  }, [currentUser, todayDate]);

  return (
    <>
      {!isAlcoholCheck && (
        <Paper shadow="sm" radius="sm" mt="md" mb="md" p="md">
          <Flex
            w="100%"
            gap="md"
            align="center"
            justify="space-around"
            bg="white"
          >
            <Box>アルコールチェックをしてください</Box>
            <AlcoholCheckModal defaultValues={defaultValues} />
          </Flex>
        </Paper>
      )}
    </>
  );
};

export default AlcoholCheckArea;
