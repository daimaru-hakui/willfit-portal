"use client";
import React, { FC, useEffect } from "react";
import NewsHeader from "./news-list-header";
import NewsToppageList from "./news-toppage-list";

import { News, User } from "@/type";

interface NewsUser extends News {
  user: User;
}

const NewsToppageArea: FC = () => {
  return (
    <>
        <NewsHeader />
        <NewsToppageList />
    </>
  );
};

export default NewsToppageArea;
