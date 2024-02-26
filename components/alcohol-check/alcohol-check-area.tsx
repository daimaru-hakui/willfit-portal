"use client";
import React, { FC, useEffect, useState } from "react";
import { Box, Flex, Paper } from "@mantine/core";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import AlcoholCheckModal from "./alcohol-check-modal";

const AlcoholCheckArea: FC = () => {
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const session = useSession();
  const currentUser = session.data?.user.uid || null;
  const [isAlcoholCheck, setIsAlcoholCheck] = useState(false);

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
        !{ ...querySnapshot.data() }.member?.includes(currentUser)
      );
    });
  }, [currentUser, todayDate]);

  useEffect(() => {
    console.log("users");
    if (currentUser) {
      const docRef = doc(db, "authority", `${currentUser}`);
      const userRef = doc(db, "users", `${currentUser}`);
      const addAuthority = async () => {
        const docSnap = await getDoc(docRef);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) return;
        await setDoc(userRef, {
          ...docSnap.data(),
        });
      };
      addAuthority();
    }
  }, [currentUser]);

  return (
    <>
      {isAlcoholCheck && (
        <Paper shadow="sm" radius="sm" mb="md" p="md">
          <Flex
            w="100%"
            gap="md"
            align="center"
            justify="space-around"
            bg="white"
            direction={{ base: "column", md: "row" }}
          >
            <Box fw="bold">アルコールチェックをしてください</Box>
            <AlcoholCheckModal defaultValues={defaultValues} />
          </Flex>
        </Paper>
      )}
    </>
  );
};

export default AlcoholCheckArea;
