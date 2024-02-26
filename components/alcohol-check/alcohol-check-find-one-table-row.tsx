"use client";
import { AlcoholCheck, User } from "@/type";
import { Table } from "@mantine/core";
import { format } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import AlcoholCheckFindOneModal from "./alcohol-check-find-one-modal";
import { useSession } from "next-auth/react";

interface Props {
  dateId:string
  alcoholCheck: AlcoholCheck;
  users: User[];
}

const AlcoholCheckFindOneTableRow: FC<Props> = ({ dateId,alcoholCheck, users }) => {
  const [isAlcoholCheck, setIsAlcoholCheck] = useState(false);
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const getUsername = (id: string) => {
    const user = users?.find((user: { uid: string }) => user.uid === id);
    if (!user) return "";
    return user.name;
  };

  useEffect(() => {
    const alcoholAuth = () => {
      const user = users.find(({ uid }) => uid === currentUser);
      setIsAlcoholCheck(user?.alcoholChecker || false);
    };
    alcoholAuth();
  }, [users, currentUser]);

  return (
    <Table.Tr>
      <Table.Td>{getUsername(alcoholCheck.uid)}</Table.Td>
      <Table.Td>{alcoholCheck.alcoholCheck1 === "1" ? "済" : "未"}</Table.Td>
      <Table.Td>
        {alcoholCheck.alcoholCheck2 === "1" ? "なし" : "あり"}
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
      {isAlcoholCheck && (
        <Table.Td>
          <AlcoholCheckFindOneModal
            defaultValues={alcoholCheck}
            dateId={dateId}
            postId={alcoholCheck.id}
          />
        </Table.Td>
      )}
    </Table.Tr>
  );
};

export default AlcoholCheckFindOneTableRow;
