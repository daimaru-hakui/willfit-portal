import React from "react";
import AlcoholCheckTable from "./components/alcohol-check-table";
import { Container, Paper } from "@mantine/core";
const AlcoholCheckPage = () => {
  return (
    <Container w={400}>
      <Paper shadow="xs" p="xl" bg="white">
        <AlcoholCheckTable />
      </Paper>
    </Container>
  );
};

export default AlcoholCheckPage;
