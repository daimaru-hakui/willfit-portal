import React from "react";
import AlcoholCheckTable from "@/components/alcohol-check/alcohol-check-table";
import { Container, Paper } from "@mantine/core";
const AlcoholCheckPage = () => {
  return (
    <Container w="100%" maw={400}>
      <Paper shadow="xs" p="xl" bg="white">
        <AlcoholCheckTable />
      </Paper>
    </Container>
  );
};

export default AlcoholCheckPage;
