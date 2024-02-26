import React from "react";
import AlcoholCheckFindOneTable from "@/components/alcohol-check/alcohol-check-find-one-table";
import { Paper } from "@mantine/core";
import AlcoholCheckShowList from "@/components/alcohol-check/alcohol-check-show-list";

const AlcoholCheckId = () => {
  return (
    <Paper p={12} shadow="md" maw={900} mx="auto">
      <AlcoholCheckFindOneTable />
      {/* <AlcoholCheckShowList/> */}
    </Paper>
  );
};

export default AlcoholCheckId;
