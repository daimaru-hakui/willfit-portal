import React, { ReactNode } from "react";
import { Flex } from "@mantine/core";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex justify="center" align="center" h="100vh" bg="gray">
      {children}
    </Flex>
  );
};

export default LoginLayout;
