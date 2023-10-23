import { options } from "@/provider/options";
import { getServerSession } from "next-auth/next";
import AlcoholCheckArea from "./alcohol-check/components/alcohol-check-area";

const Dashboard = async () => {
  const session = await getServerSession(options);
  return (
    <div className="flex justify-center">
      <AlcoholCheckArea />
    </div>
  );
};

export default Dashboard;