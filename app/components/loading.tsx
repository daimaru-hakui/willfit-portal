import { useStore } from "@/store";
import { Flex, Loader } from "@mantine/core";
import React from "react";

const Loading = () => {
  const isLoading = useStore((state) => state.isLoading);
  return (
    <>
      {isLoading && (
        <Flex
          pos="fixed"
          top={0}
          w="100%"
          h="100vh"
          style={{ zIndex: 1000000 }}
          justify="center"
          align="center"
        >
          <Loader size={46} />
        </Flex>
      )}
    </>
  );
};

export default Loading;
