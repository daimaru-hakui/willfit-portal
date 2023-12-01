import React, { FC } from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AlcoholCheckInputs } from "@/type";
import AlcoholCheckForm from "./alcohol-check-form";

interface Props {
    defaultValues:AlcoholCheckInputs
}

const AlcoholCheckModal:FC<Props> = ({defaultValues}) => {
    const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <>
      <Button w="100%" maw={350} onClick={open}>アルコールチェック</Button>
      <Modal opened={opened} onClose={close} title="アルコールチェック">
        <AlcoholCheckForm
          close={close}
          defaultValues={defaultValues}
          pageType="NEW"
        />
      </Modal>
    </>
  );
};

export default AlcoholCheckModal;
