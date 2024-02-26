import { QuickAccessLink } from "@/type";
import React, { FC } from "react";
import { Flex, Box } from "@mantine/core";
import Link from "next/link";

interface Props {
  quickAccessLink: QuickAccessLink;
}

const QuickAccessToppageTab: FC<Props> = ({ quickAccessLink }) => {
  return (
    <Box component="li" p={5}>
      <Box fz="sm">
        <Link href={quickAccessLink.link}>{quickAccessLink.title}</Link>
      </Box>
    </Box>
  );
};

export default QuickAccessToppageTab;
