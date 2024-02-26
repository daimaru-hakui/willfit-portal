import React from "react";
import AlcoholCheckList from "@/components/alcohol-check/alcohol-check-list";
import { Container, Paper } from "@mantine/core";
const AlcoholCheckPage = () => {
  return (
    <Container w="100%" maw={400}>
      <Paper shadow="xs" p="xl" bg="white">
        <AlcoholCheckList />
      </Paper>
    </Container>
  );
};

export default AlcoholCheckPage;
