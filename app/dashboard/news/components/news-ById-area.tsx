"use client";
import React, { FC } from "react";
import NewsByIdReadLog from "./news-byid-readlog";
import NewsByIdContent from "./news-byid-content";

const NewsByIdArea: FC = () => {
  return (
    <>
      <NewsByIdContent />
      <NewsByIdReadLog />
    </>
  );
};

export default NewsByIdArea;
