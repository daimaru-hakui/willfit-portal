import { Button, Table } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
    alcoholCheck:any
}

const AlcoholCheckTableRow:FC<Props> = ({alcoholCheck}) => {
  return (
    <Table.Tr>
      <Table.Td>{alcoholCheck.id}</Table.Td>
      <Table.Td>{alcoholCheck.member.length}人</Table.Td>
      <Table.Td>
        <Link href={`/dashboard/alcohol-check/${alcoholCheck.id}`}>
        <Button size="xs">詳細</Button>
        </Link>
      </Table.Td>
    </Table.Tr>
  );
};

export default AlcoholCheckTableRow;
