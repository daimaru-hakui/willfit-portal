import { Container, Paper } from "@mantine/core";
import axios from "axios";
import React from "react";
import { Calendar } from "@/type";
import CalendarArea from "./components/calendar-area";

const CalendarPage = async () => {
  const getCalendar = async () => {
    const url = " https://portal-sub.microcms.io/api/v1/calendar";
    const res = await axios.get(url, {
      headers: {
        " X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
      },
    });
    const data: Calendar = await res.data;
    return data;
  };
  const data = await getCalendar();
  return (
    <Container w="100%">
      <Paper shadow="xs" p="xl" bg="white">
        <CalendarArea data={data} />
      </Paper>
    </Container>
  );
};

export default CalendarPage;
