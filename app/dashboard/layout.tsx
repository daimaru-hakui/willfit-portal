import NavBar from "../components/nav-bar";
import { Box, Flex } from "@mantine/core";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="p-12">
        <Flex p={24} justify="center" bg="#f4f4f4" mih="calc(100vh - 50px)">
          <Box w="100%" maw={600}>
            {children}
          </Box>
        </Flex>
      </main>
    </>
  );
}
