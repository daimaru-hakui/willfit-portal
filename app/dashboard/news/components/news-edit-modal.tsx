import {  Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import NewsForm from "./news-form";
import { News, User } from "@/type";

interface NewsUser extends News {
  user: User;
}

interface Props {
  news: NewsUser;
}

const NewsEditModal: FC<Props> = ({ news }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const defaultValues = {
    id: news.id,
    postDate: news.postDate,
    title: news.title,
    content: news.content,
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="編集">
        <NewsForm defaultValues={defaultValues} pageType="EDIT" close={close} news={news} />
      </Modal>
      <AiOutlineEdit
        variant="outline"
        style={{ cursor: "pointer", fontSize: 20 }}
        onClick={open}
      />
    </>
  );
};

export default NewsEditModal;
