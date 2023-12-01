"use client";
import { Box, Table } from "@mantine/core";
import React, { FC } from "react";
import NewsTableRow from "./news-table-row";
import { News, User } from "@/type";

interface NewsUser extends News {
  user: User;
}

interface Props {
  newsList:NewsUser[]
}

const NewsToppageTable: FC<Props> = ({newsList}) => {
  
  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt="md" w="830px">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>日付</Table.Th>
            <Table.Th>タイトル</Table.Th>
            <Table.Th>内容</Table.Th>
            <Table.Th>作成者</Table.Th>
            <Table.Th w={100}>アクション</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {newsList.map((news) => (
            <NewsTableRow key={news.id} news={news} />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default NewsToppageTable;
