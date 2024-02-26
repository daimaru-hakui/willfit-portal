import React from "react";
import { Flex, Title, Button } from "@mantine/core";
import Link from "next/link";

const QuickAccessToppageHeader = () => {
  return (
    <Flex justify="space-between" align="center">
      <Title order={2} fz={{base:"md",md:"lg"}}>クイックアクセスリンク</Title>
      <Flex gap="xs">
        <Link href="/dashboard/quick-access">
          <Button size="xs" variant="outline">
            一覧
          </Button>
        </Link>

        <Link href="/dashboard/quick-access/new">
          <Button size="xs">作成</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default QuickAccessToppageHeader;
