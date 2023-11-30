import AlcoholCheckArea from "./alcohol-check/components/alcohol-check-area";
import { Container } from "@mantine/core";
import NewsToppageArea from "./news/components/news-toppage-area";

const Dashboard = async () => {
  return (
    <Container w="100%" maw={900}>
      <AlcoholCheckArea />
      <NewsToppageArea/>
    </Container>
  );
};

export default Dashboard;
