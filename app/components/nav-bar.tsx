"use client";
import React, { FC } from "react";
import { navList } from "@/utils/nav-list";
import Link from "next/link";
import { Flex, Text, Box, Button } from "@mantine/core";
import HeaderMenu from "./header-menu";
import HeaderDrawer from "./header-drawer";

const NavBar: FC = () => {
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
            {navList.map(({ title, path, target }, index) => (
              <Box key={index}>
                <Link
                  href={`${path}`}
                  rel="noopener noreferrer"
                  target={target ? "_blank" : "_self"}
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
