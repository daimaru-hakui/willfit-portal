import { Container, Paper } from "@mantine/core";
import React from "react";
import NewsNewArea from "../components/news-new-area";

const NewsNewPage = () => {
  return (
    <Container w="100%" maw={500}>
      <Paper shadow="sm" p="md">
        <NewsNewArea />
      </Paper>
    </Container>
  );
};

export default NewsNewPage;
