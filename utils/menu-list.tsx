import {  rem} from "@mantine/core";
import { AiOutlineHome } from "react-icons/ai";
import { PiBeerSteinBold } from "react-icons/pi";

export const menuList = [
  {
    title: "ホーム",
    link: "/dashboard",
    icon: <AiOutlineHome style={{ width: rem(14), height: rem(14) }} />,
  },
  {
    title: "アルコールチェック",
    link: "/dashboard/alcohol-check",
    icon: <PiBeerSteinBold style={{ width: rem(14), height: rem(14) }} />,
  },
  {
    title: "お知らせ一覧",
    link: "/dashboard/news",
    icon: <PiBeerSteinBold style={{ width: rem(14), height: rem(14) }} />,
  },
  {
    title: "クイックリンク",
    link: "/dashboard/quick-access",
    icon: <PiBeerSteinBold style={{ width: rem(14), height: rem(14) }} />,
  },
];
