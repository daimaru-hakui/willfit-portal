import { options } from "@/lib/next-auth/options";
import { getServerSession } from "next-auth/next";
import AlcoholCheckArea from "./alcohol-check/components/alcohol-check-area";
import { Box, Flex } from "@mantine/core";

const Dashboard = async () => {
  const session = await getServerSession(options);
  return <AlcoholCheckArea />;
};

export default Dashboard;
