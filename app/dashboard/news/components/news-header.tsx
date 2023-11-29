"use client";
import { Button, Flex, Title } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NewsHeader = () => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <Flex justify="space-between">
      <Title order={2}>{pathname === "/dashboard" ? "NEWS" : "NEWS一覧"}</Title>
      <Flex gap="xs">
        {pathname === "/dashboard" ? (
          <Link href="/dashboard/news">
            <Button size="xs" variant="outline">
              一覧
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard">
            <Button size="xs" variant="outline">
              トップページへ
            </Button>
          </Link>
        )}
        <Link href="/dashboard/news/new">
          <Button size="xs">作成</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default NewsHeader;
