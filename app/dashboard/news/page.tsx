import { Container } from "@mantine/core";
import React from "react";
import NewsArea from "@/components/news/news-area";

const NewsPage = () => {
  return (
    <Container w="100%" maw={1100}>
      <NewsArea  />
    </Container>
  );
};

export default NewsPage;
