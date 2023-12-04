import React from "react";
import { Container } from "@mantine/core";
import NewsByIdArea from "../components/news-byid-area";

const NewsFindOnePage = () => {
  
  return (
    <Container maw={600}>
      <NewsByIdArea  />
    </Container>
  );
};

export default NewsFindOnePage;
