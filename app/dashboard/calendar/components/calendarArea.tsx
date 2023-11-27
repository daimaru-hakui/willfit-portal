"use client";
import React, { FC } from "react";
import { Box, Tabs } from "@mantine/core";
import Image from "next/image";
import { Calendar } from "@/type";

interface Props {
  data: Calendar;
}

const CalendarArea: FC<Props> = ({ data }) => {
  return (
    <Tabs variant="outline" defaultValue="willfit">
      <Tabs.List>
        <Tabs.Tab value="willfit">ウィルフィット</Tabs.Tab>
        <Tabs.Tab value="honnsha">大丸白衣 本社</Tabs.Tab>
        <Tabs.Tab value="tokushima">徳島工場</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="willfit">
        {data?.imageWillfit?.url && (
          <Image
            src={data?.imageWillfit?.url}
            width={800}
            height={500}
            alt={"ウィルフィット"}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="honnsha">
        {data.imageHonsha.url && (
          <Image
            src={data?.imageHonsha.url}
            width={800}
            height={500}
            alt={"大丸白衣 本社"}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
        {data.imageHonshaNext.url && (
          <Image
            src={data?.imageHonshaNext.url}
            width={800}
            height={500}
            alt={"大丸白衣 本社"}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="tokushima">
        <Box w="100%">
          {data.imageTokushima.url && (
            <Image
              src={data?.imageTokushima.url}
              width={800}
              height={500}
              alt={"大丸白衣 徳島工場"}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
          {data.imageTokushimaNext.url && (
            <Image
              src={data?.imageTokushimaNext.url}
              width={800}
              height={500}
              alt={"大丸白衣 徳島工場"}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
};

export default CalendarArea;
