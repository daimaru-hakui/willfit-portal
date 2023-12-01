import React, { FC } from "react";
import { Button, Flex, Table } from "@mantine/core";
import { QuickAccessLink } from "@/type";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import QuickAccessEditModal from "./quick-access-edit-modal";
import { excerpt } from "@/utils/functions";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { quickAccessCategoryList } from "@/utils/quick-access-category-list";

// interface AccessLinkUser extends QuickAccessLink {
//   user: User;
// }

interface Props {
  quickAccess: QuickAccessLink;
}

const deleteQuickAccess = async (id: string) => {
  const result = confirm("削除して宜しいでしょうか");
  if (!result) return;
  const docRef = doc(db, "willfitQuickAccessLinks", `${id}`);
  try {
    await deleteDoc(docRef);
  } catch (err) {
    console.error(err);
    alert("削除に失敗しました");
  }
};

const getCategoryValue = (categoryValue: string) => {
  const category = quickAccessCategoryList.find(
    (quickAccess) => quickAccess.value === categoryValue
  );
  return category?.label;
};

const QuickAccessTableRow: FC<Props> = ({ quickAccess }) => {
  const session = useSession();
  //   const currentUser = session.data?.user.uid;
  return (
    <Table.Tr fz="sm">
      <Table.Td w={110}>{getCategoryValue(quickAccess?.category)}</Table.Td>
      <Table.Td w={180}>{excerpt(quickAccess?.title, 10)}</Table.Td>
      <Table.Td>{excerpt(quickAccess.link, 20)}</Table.Td>
      <Table.Td>
        <Flex justify="flex-start" align="center" gap="md">
          <QuickAccessEditModal quickAccess={quickAccess} />
          <AiOutlineDelete
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() => deleteQuickAccess(quickAccess.id)}
          />
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
};

export default QuickAccessTableRow;
