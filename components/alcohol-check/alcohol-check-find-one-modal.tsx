"use client";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";
import { Modal, Button } from "@mantine/core";
import AlcoholChecklegacyForm from "./alcohol-check-form2";
import { AlcoholCheckInputs } from "@/type";

interface Props {
  defaultValues: AlcoholCheckInputs;
  dateId:string
  postId: string;
}

const AlcoholCheckFindOneModal: FC<Props> = ({ defaultValues,dateId, postId }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="編集" centered>
        <AlcoholChecklegacyForm
          defaultValues={defaultValues}
          close={close}
          pageType="EDIT"
          dateId={dateId}
          postId={postId}
        />
      </Modal>
      
      <Button size="xs" onClick={open}>編集</Button>
    </>
  );
};

export default AlcoholCheckFindOneModal;
