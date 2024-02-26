"use client";
import { Button, Flex, Title } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NewsListHeader = () => {
  const pathname = usePathname();
  return (
    <Flex justify="space-between" align="center">
      <Title order={2} fz={{base:"md",md:"lg"}}>
        {pathname === "/dashboard" ? "お知らせ" : "お知らせ一覧"}
      </Title>
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

export default NewsListHeader;
