"use client"
import { Flex, Paper } from "@mantine/core";
import React, { FC } from "react";
import NewsTable from "./news-table";
import NewsHeader from "./news-header";
import { usePathname } from "next/navigation";
import NewsToppageTable from "./news-toppage-table";

const NewsArea: FC = () => {
  const pathname = usePathname()
  return (
    <Paper shadow="sm" p="md">
      <NewsHeader />
      {pathname === "/dashboard" ? (
        <NewsToppageTable />
        ):(
        <NewsTable />
      )}
    </Paper>
  );
};

export default NewsArea;
