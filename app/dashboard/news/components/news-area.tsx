"use client";
import { Paper } from "@mantine/core";
import React, { FC } from "react";
import NewsTable from "./news-table";
import NewsHeader from "./news-header";
import { useStore } from "@/store";

const NewsArea: FC = () => {
  const newsList = useStore((state) => state.newsList);
  return (
    <Paper shadow="sm" p="md">
        <NewsHeader />
        {newsList.length > 0 && <NewsTable />}
    </Paper>
  );
};

export default NewsArea;
