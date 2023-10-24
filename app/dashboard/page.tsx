import { options } from "@/lib/next-auth/options";
import { getServerSession } from "next-auth/next";
import AlcoholCheckArea from "./alcohol-check/components/alcohol-check-area";
import { Box, Flex } from "@mantine/core";

const Dashboard = async () => {
  const session = await getServerSession(options);
  return (
    <Flex p={24} justify="center" bg="#f4f4f4" mih="calc(100vh - 50px)">
      <Box w="100%" maw={600}>
        <AlcoholCheckArea />
      </Box>
    </Flex>
  );
};

export default Dashboard;
