"use client";
import React, { FC } from "react";
import NewsList from "./news-list";
import { Paper } from "@mantine/core";
import NewsHeader from "./news-list-header";

const NewsArea: FC = () => {
  return (
    <Paper shadow="sm" p="md">
      <NewsHeader />
      <NewsList />
    </Paper>
  );
};

export default NewsArea;
