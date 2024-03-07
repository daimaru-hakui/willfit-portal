"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Text, Box, Button } from "@mantine/core";
import HeaderMenu from "./header-menu";
import HeaderDrawer from "./header-drawer";
import { navList } from "@/utils/nav-list";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const NavBar: FC = () => {
  const session = useSession();
  const uid = session.data?.user.uid;
  const [isDaimaru, setIsDaimaru] = useState(false);
  
  useEffect(() => {
    const getDaimaruUser = async () => {
      const docRef = doc(db, "authority", `${uid}`);
      const snapShot = await getDoc(docRef);
      const bool = snapShot.data()?.daimaru;
      setIsDaimaru(bool);
    };
    getDaimaruUser()
  }, [uid]);

  return (
    <Flex w="100%" h="50px" justify="center">
      <Flex
        py={6}
        px={12}
        align="center"
        justify="space-between"
        w="100%"
        maw={1200}
      >
        <Link href="/dashboard" style={{ textDecorationLine: "none" }}>
          <Text c="black" fw={700}>
            ポータルサイト
          </Text>
        </Link>
        <Flex align="center" gap={12}>
          <Flex gap={12} display={{ base: "none", sm: "flex" }}>
            {isDaimaru && (
              <Link
                href={`https://daimaru-portal-site.vercel.app/`}
                rel="noopener noreferrer"
              >
                <Button
                  variant=""
                  size="xs"
                  className="hidden lg:inline-block px-2"
                >
                  <span>大丸白衣</span>
                </Button>
              </Link>
            )}
            {navList.map(({ title, path, target }, index) => (
              <Box key={index}>
                <Link
                  href={`${path}`}
                  target={target ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="xs"
                    className="hidden lg:inline-block px-2"
                  >
                    <span>{title}</span>
                  </Button>
                </Link>
              </Box>
            ))}
          </Flex>
          <Box display={{ base: "block", sm: "none" }}>
            <HeaderDrawer />
          </Box>
          <HeaderMenu />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
