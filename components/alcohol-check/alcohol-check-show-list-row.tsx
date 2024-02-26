"use client";
import { AlcoholCheck, User } from "@/type";
import { Table } from "@mantine/core";
import { format } from "date-fns";
import React, { FC} from "react";
import AlcoholCheckShowModal from "./alcohol-check-show-modal";

interface Props {
  alcoholCheck: AlcoholCheck & { user: User };
}

const AlcoholCheckListRow: FC<Props> = ({ alcoholCheck }) => {
  return (
    <Table.Tr>
      <Table.Td>{alcoholCheck?.user?.name}</Table.Td>
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
        <AlcoholCheckShowModal
          defaultValues={alcoholCheck}
          userId={alcoholCheck.id}
        />
      </Table.Td>
    </Table.Tr>
  );
};

export default AlcoholCheckListRow;
