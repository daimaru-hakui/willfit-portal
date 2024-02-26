"use client";
import React, { FC } from "react";
import { Tabs, Box } from "@mantine/core";
import { QuickAccessLink } from "@/type";
import QuickAccessToppageTab from "./quick-access-toppage-tab";

interface Props {
  quickAccessLinks: QuickAccessLink[];
}
const QuickAccessToppageTabList: FC<Props> = ({ quickAccessLinks }) => {

  const filterTabs = (category: string) => {
    const tabs = quickAccessLinks
      .filter((quickAccessLink) => quickAccessLink.category === category)
      .map((quickAccessLink) => (
        <QuickAccessToppageTab
          key={quickAccessLink.id}
          quickAccessLink={quickAccessLink}
        />
      ));
    return (
      <Box component="ul" m={0} pl={32}>
        {tabs}
      </Box>
    );
  };

  return (
    <Tabs defaultValue="SALES" mt="lg">
      <Tabs.List>
        <Tabs.Tab value="SALES">営業</Tabs.Tab>
        <Tabs.Tab value="ACCOUNTING">経理</Tabs.Tab>
        <Tabs.Tab value="AFFAIRS">総務</Tabs.Tab>
        <Tabs.Tab value="LOSISTICS">物流</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="SALES">{filterTabs("SALES")}</Tabs.Panel>
      <Tabs.Panel value="ACCOUNTING">{filterTabs("ACCOUNTING")}</Tabs.Panel>
      <Tabs.Panel value="AFFAIRS">{filterTabs("AFFAIRS")}</Tabs.Panel>
      <Tabs.Panel value="LOSISTICS">{filterTabs("LOSISTICS")}</Tabs.Panel>
    </Tabs>
  );
};

export default QuickAccessToppageTabList;
