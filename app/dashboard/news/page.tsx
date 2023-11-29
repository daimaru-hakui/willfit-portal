import { Container } from "@mantine/core";
import React from "react";
import NewsArea from "./components/news-area";

const NewsPage = () => {
  return (
    <Container w="100%" maw={900}>
      <NewsArea  />
    </Container>
  );
};

export default NewsPage;
