"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/nav-bar";
import { Box, Flex } from "@mantine/core";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useSession } from "next-auth/react";
import { User } from "@/type";
import { useRouter } from "next/navigation";
import Loading from "../components/loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(db, "authority");
      const snapShot = await getDocs(usersRef);
      const users = snapShot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as User)
      );
      const user = users.find((user) => user.id === data?.user.uid);
      if (user?.willfit) {
        setCurrentUser(true);
      }
    };
    getUsers();
  }, [data?.user.uid, router]);

  return (
    <>
      <Flex direction="column">
        <Box
          component="header"
          pos="sticky"
          top={0}
          bg="white"
          style={{ boxShadow: "1px 0 1px 1px rgba(0,0,0,10%)", zIndex: 20 }}
        >
          <NavBar />
        </Box>
        <main>
          <Flex
            p={{ base: "xs", md: "md" }}
            justify="center"
            bg="#f4f4f4"
            mih="calc(100vh - 50px)"
          >
            {currentUser && (
              <Box w="100%">
                {children}
              </Box>
            )}
          </Flex>
        </main>
      </Flex>
      <Loading />
    </>
  );
}
