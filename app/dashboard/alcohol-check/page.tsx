import React from "react";
import AlcoholCheckList from "@/components/alcohol-check/alcohol-check-list";
import { Container, Paper } from "@mantine/core";
import AlcoholCheckHeader from "@/components/alcohol-check/alcohol-check-header";
const AlcoholCheckPage = () => {
  return (
    <Container w="100%" maw={400}>
      <Paper shadow="xs" p="xl" bg="white">
        <AlcoholCheckHeader />
        <AlcoholCheckList />
      </Paper>
    </Container>
  );
};

export default AlcoholCheckPage;
