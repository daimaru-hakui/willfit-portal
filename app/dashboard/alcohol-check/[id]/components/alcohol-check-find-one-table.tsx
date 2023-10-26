"use client";
import { Button, Table } from "@mantine/core";
import React from "react";
import AlcoholCheckFindOneTableRow from "./alcohol-check-find-one-table-row";

const AlcoholCheckFindOneTable = () => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>名前</Table.Th>
          <Table.Th>アルコール検査</Table.Th>
          <Table.Th>酒気帯び</Table.Th>
          <Table.Th>数値</Table.Th>
          <Table.Th>提出時刻</Table.Th>
          <Table.Th>更新時刻</Table.Th>
          <Table.Th>編集</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <AlcoholCheckFindOneTableRow />
      </Table.Tbody>
    </Table>
  );
};

export default AlcoholCheckFindOneTable;
