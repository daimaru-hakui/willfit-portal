import React from "react";
import { Flex, Title, Button } from "@mantine/core";
import Link from "next/link";

const AlcoholCheckShowHeader = () => {
  return (
    <Flex justify="space-between">
      <Title order={2} fz="md">アルコールチェック</Title>
      <Flex gap="xs">
        <Link href="/dashboard/alcohol-check">
          <Button size="xs" variant="outline">
            一覧へ
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default AlcoholCheckShowHeader;
