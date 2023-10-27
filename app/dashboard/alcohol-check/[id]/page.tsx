import React from "react";
import AlcoholCheckFindOneTable from "./components/alcohol-check-find-one-table";
import { Paper } from "@mantine/core";

const AlcoholCheckId = () => {
  return (
    <Paper p={12} shadow="md">
      <AlcoholCheckFindOneTable />
    </Paper>
  );
};

export default AlcoholCheckId;
