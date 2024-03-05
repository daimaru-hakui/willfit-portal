import React from "react";
import { Paper } from "@mantine/core";
import AlcoholCheckShowList from "@/components/alcohol-check/alcohol-check-show-list";
import AlcoholCheckShowHeader from "@/components/alcohol-check/alcohol-check-show-header";

const AlcoholCheckId = () => {
  return (
    <Paper p={16} shadow="md" maw={900} mx="auto">
      <AlcoholCheckShowHeader/>
      <AlcoholCheckShowList/>
    </Paper>
  );
};

export default AlcoholCheckId;
