import React from "react";
import { Container, Paper } from "@mantine/core";
import QuickAccessForm from "@/components/quick-access/quick-access-form";

const QuickAccessById = () => {
  const defaultValues = {
    id: "",
    category: "SALES",
    title: "",
    link: "",
  };
  return (
    <Container w="100%" maw={600}>
      <Paper p="lg" radius="md" shadow="sm">
        <QuickAccessForm pageType="NEW" defaultValues={defaultValues} />
      </Paper>
    </Container>
  );
};

export default QuickAccessById;
