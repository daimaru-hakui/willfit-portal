import React from "react";
import { Flex, Title, Button } from "@mantine/core";
import Link from "next/link";

const QuickAccessHeader = () => {
  return (
    <Flex justify="space-between">
      <Title order={2}>クイックアクセス</Title>
      <Flex gap="xs">
        <Link href="/dashboard">
          <Button size="xs" variant="outline">
            トップページへ
          </Button>
        </Link>

        <Link href="/dashboard/quick-access/new">
          <Button size="xs">作成</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default QuickAccessHeader;
