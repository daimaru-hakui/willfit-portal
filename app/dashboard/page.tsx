import AlcoholCheckArea from "./alcohol-check/components/alcohol-check-area";
import { Container } from "@mantine/core";
import NewsArea from "./news/components/news-area";

const Dashboard = async () => {
  return (
    <Container w="100%" maw={900}>
      <AlcoholCheckArea />
      <NewsArea/>
    </Container>
  );
};

export default Dashboard;
