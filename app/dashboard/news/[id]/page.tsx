import React from "react";
import { Container } from "@mantine/core";
import NewsFindByIdArea from "../components/news-ById-area";

const NewsFindOnePage = () => {
  
  return (
    <Container maw={500}>
      <NewsFindByIdArea  />
    </Container>
  );
};

export default NewsFindOnePage;
