"use client";
import React, { FC } from "react";
import NewsByIdReadLog from "./news-show-readlog";
import NewsByIdContent from "./news-show-content";

const NewsShowArea: FC = () => {
  return (
    <>
      <NewsByIdContent />
      <NewsByIdReadLog />
    </>
  );
};

export default NewsShowArea;