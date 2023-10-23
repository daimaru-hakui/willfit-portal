import { options } from "@/provider/options";
import { getServerSession } from "next-auth/next";

const Dashboard = async () => {
  const session = await getServerSession(options);
  const user = session;
  return <p>{JSON.stringify(user)}</p>;
};

export default Dashboard;