"use client";
import { Box, Table } from "@mantine/core";
import React, { FC } from "react";
import NewsTableRow from "./news-table-row";
import { News, User } from "@/type";
import NewsToppageTableRow from "./news-toppage-table-row";

interface NewsUser extends News {
  user: User;
}

interface Props {
  newsList:NewsUser[]
}

const NewsToppageTable: FC<Props> = ({newsList}) => {
  
  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt="md" w="100%" miw={500}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>日付</Table.Th>
            <Table.Th>タイトル</Table.Th>
            <Table.Th>作成者</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {newsList.map((news) => (
            <NewsToppageTableRow key={news.id} news={news} />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default NewsToppageTable;
