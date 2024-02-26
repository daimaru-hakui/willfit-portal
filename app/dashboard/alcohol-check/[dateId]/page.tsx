import React from "react";
import { Paper } from "@mantine/core";
import AlcoholCheckShowList from "@/components/alcohol-check/alcohol-check-show-list";

const AlcoholCheckId = () => {
  return (
    <Paper p={12} shadow="md" maw={900} mx="auto">
      <AlcoholCheckShowList/>
    </Paper>
  );
};

export default AlcoholCheckId;
