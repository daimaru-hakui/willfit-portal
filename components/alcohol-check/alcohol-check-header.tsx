import React from "react";
import { Flex, Title, Button } from "@mantine/core";
import Link from "next/link";

const AlcoholCheckHeader = () => {
  return (
    <Flex justify="space-between">
      <Title order={2} fz="md">アルコールチェック</Title>
      <Flex gap="xs">
        <Link href="/dashboard">
          <Button size="xs" variant="outline">
            トップページへ
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default AlcoholCheckHeader;
