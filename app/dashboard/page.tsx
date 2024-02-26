import { Flex, Box, Paper } from "@mantine/core";
import AlcoholCheckArea from "../../components/alcohol-check/alcohol-check-area";
import { Container } from "@mantine/core";
import NewsToppageArea from "@/components/news/news-toppage-area";
import QuickAccessToppageArea from "@/components/quick-access/quick-access-toppage-area";

const Dashboard = async () => {
  return (
    <Container w="100%" maw={1200} p={0}>
      <AlcoholCheckArea />
      <Flex
        w="100%"
        gap={{base:"sm",md:"md"}}
        justify="space-between"
        align="stretch"
        direction={{ base: "column", md: "row" }}
      >
        <Paper w={{ base: "100%", md: "50%" }} shadow="sm" p="md">
          <NewsToppageArea />
        </Paper>
        <Paper w={{ base: "100%", md: "50%" }} shadow="sm" p="md">
          <QuickAccessToppageArea />
        </Paper>
      </Flex>
    </Container>
  );
};

export default Dashboard;
