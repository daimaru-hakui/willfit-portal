"use client";
import { AlcoholCheck } from "@/type";
import { Table } from "@mantine/core";
import { format } from "date-fns";
import React, { FC } from "react";
import AlcoholCheckEditModal from "./alcohol-check-edit-modal";

interface Props {
  alcoholCheck: AlcoholCheck ;
}

const AlcoholCheckShowListRow: FC<Props> = ({ alcoholCheck }) => {
  return (
    <Table.Tr>
      <Table.Td>{alcoholCheck?.username}</Table.Td>
      <Table.Td ta="center">
        {Number(alcoholCheck.alcoholCheck1) === 1 ? "済" : "未"}
      </Table.Td>
      <Table.Td ta="center">
        {Number(alcoholCheck.alcoholCheck2) === 1 ? "なし" : "あり"}
      </Table.Td>
      <Table.Td>{alcoholCheck.alcoholCheckValue}mg</Table.Td>
      <Table.Td>
        {alcoholCheck.createdAt &&
          format(new Date(alcoholCheck.createdAt.toDate()), "HH時mm分ss秒")}
      </Table.Td>
      <Table.Td>
        {alcoholCheck.updatedAt &&
          format(new Date(alcoholCheck?.updatedAt.toDate()), "HH時mm分ss秒")}
      </Table.Td>
      <Table.Td>
        <AlcoholCheckEditModal
          defaultValues={alcoholCheck}
          userId={alcoholCheck.id}
        />
      </Table.Td>
    </Table.Tr>
  );
};

export default AlcoholCheckShowListRow;
