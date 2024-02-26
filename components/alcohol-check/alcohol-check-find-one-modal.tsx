"use client";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";
import { Modal, Button } from "@mantine/core";
import AlcoholCheckForm from "./alcohol-check-form";
import { AlcoholCheckInputs } from "@/type";

interface Props {
  defaultValues: AlcoholCheckInputs;
  postId: string;
}

const AlcoholCheckFindOneModal: FC<Props> = ({ defaultValues, postId }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="編集" centered>
        <AlcoholCheckForm
          defaultValues={defaultValues}
          close={close}
          pageType="EDIT"
          postId={postId}
        />
      </Modal>
      
      <Button size="xs" onClick={open}>編集</Button>
    </>
  );
};

export default AlcoholCheckFindOneModal;
