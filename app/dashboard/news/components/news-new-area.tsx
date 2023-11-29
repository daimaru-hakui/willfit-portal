"use client";
import React from "react";
import NewsForm from "./news-form";
import { format } from "date-fns";

const NewsNewArea = () => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const defaultValues = {
    id:"",
    postDate: currentDate,
    title: "",
    content: "",
  };
  return <NewsForm pageType="NEW" defaultValues={defaultValues} />;
};

export default NewsNewArea;
