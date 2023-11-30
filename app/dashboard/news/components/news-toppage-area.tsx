"use client";
import { Paper } from "@mantine/core";
import React, { FC } from "react";
import NewsHeader from "./news-header";
import NewsToppageTable from "./news-toppage-table";
import { useStore } from "@/store";

const NewsToppageArea: FC = () => {
  const newsList = useStore((state) => state.newsList);
  return (
    <>
      {newsList.length > 0 && (
        <Paper shadow="sm" p="md">
          <NewsHeader />
          <NewsToppageTable />
        </Paper>
      )}
    </>
  );
};

export default NewsToppageArea;
