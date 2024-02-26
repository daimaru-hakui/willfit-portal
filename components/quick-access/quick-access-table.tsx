"use client";
import React, { FC } from "react";
import { Box, Table } from "@mantine/core";
import { QuickAccessLink } from "@/type";
import QuickAccessTableRow from "./quick-access-table-row";

interface Props {
  quickAccessLinks: QuickAccessLink[];
}

const QuickAccessTable: FC<Props> = ({ quickAccessLinks }) => {
  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt="md" w="600px">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={100}>カテゴリー</Table.Th>
            <Table.Th w={100}>タイトル</Table.Th>
            <Table.Th w={200}>リンク</Table.Th>
            <Table.Th w={120}>アクション</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {quickAccessLinks.map((quickAccess) => (
            <QuickAccessTableRow
              key={quickAccess.id}
              quickAccess={quickAccess}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default QuickAccessTable;
