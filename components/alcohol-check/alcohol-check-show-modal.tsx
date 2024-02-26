"use client";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";
import { Modal, Button } from "@mantine/core";
import AlcoholCheckForm from "./alcohol-check-form";
import { AlcoholCheckInputs } from "@/type";
import { useParams } from "next/navigation";

interface Props {
  defaultValues: AlcoholCheckInputs;
  userId: string;
}

const AlcoholCheckShowModal: FC<Props> = ({ defaultValues, userId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { dateId }: { dateId: string } = useParams();

  return (
    <>
      <Modal opened={opened} onClose={close} title="編集" centered>
        <AlcoholCheckForm
          defaultValues={defaultValues}
          close={close}
          pageType="EDIT"
          dateId={dateId}
          userId={userId}
        />
      </Modal>

      <Button size="xs" onClick={open}>
        編集
      </Button>
    </>
  );
};

export default AlcoholCheckShowModal;
