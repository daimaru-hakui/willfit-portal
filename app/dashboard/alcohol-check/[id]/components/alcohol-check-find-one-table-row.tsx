"use client";
import { AlcoholCheck } from "@/type";
import {Table } from "@mantine/core";
import { format } from "date-fns";
import React, { FC } from "react";
import AlcoholCheckFindOneModal from "./alcohol-check-find-one-modal";

interface Props {
  alcoholCheck: AlcoholCheck;
  users: any;
}

const AlcoholCheckFindOneTableRow: FC<Props> = ({
  alcoholCheck,
  users,
}) => {
  const getUsername = (id: string) => {
    const user = users?.find((user: { uid: string }) => user.uid === id);
    if (!user) return "";
    return user.name;
  };

  return (
    <Table.Tr>
      <Table.Td>{getUsername(alcoholCheck.uid)}</Table.Td>
      <Table.Td>{alcoholCheck.alcoholCheck1 === "1" ? "済" : "未"}</Table.Td>
      <Table.Td>
        {alcoholCheck.alcoholCheck2 === "1" ? "なし" : "あり"}
      </Table.Td>
      <Table.Td>
        {alcoholCheck.alcoholCheckValue !== 0
          ? alcoholCheck.alcoholCheckValue
          : "-"}
      </Table.Td>
      <Table.Td>
        {alcoholCheck.createdAt &&
          format(new Date(alcoholCheck.createdAt.toDate()), "HH時mm分ss秒")}
      </Table.Td>
      <Table.Td>
        {alcoholCheck.updatedAt &&
          format(new Date(alcoholCheck?.updatedAt.toDate()), "HH時mm分ss秒")}
      </Table.Td>
      <Table.Td>
        <AlcoholCheckFindOneModal
          defaultValues={alcoholCheck}
          postId={alcoholCheck.id}
        />
      </Table.Td>
    </Table.Tr>
  );
};

export default AlcoholCheckFindOneTableRow;
