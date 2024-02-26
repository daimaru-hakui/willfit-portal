import React,{FC} from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import QuickAccessForm from "./quick-access-form";
import { QuickAccessLink } from "@/type";
import { AiOutlineEdit } from "react-icons/ai";

interface Props {
  quickAccess: QuickAccessLink;
}

const QuickAccessEditModal:FC<Props> = ({quickAccess}) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="編集">
        <QuickAccessForm
          defaultValues={quickAccess}
          pageType="EDIT"
          close={close}
        />
      </Modal>
      <AiOutlineEdit
        variant="outline"
        style={{ cursor: "pointer", fontSize: 20 }}
        onClick={open}
      />
    </>
  );
};

export default QuickAccessEditModal;
