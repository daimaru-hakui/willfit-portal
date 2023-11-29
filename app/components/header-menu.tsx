"use client";
import { Menu, Button, rem, Box } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { PiBeerSteinBold } from "react-icons/pi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { User } from "@/type";

const HeaderMenu = () => {
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!currentUser) return;
    const getUser = async () => {
      const docRef = doc(db, "authority", currentUser);
      const snapShot = await getDoc(docRef);
      setUser({ ...snapShot.data() } as User);
    };
    getUser();
  }, [currentUser]);

  const logout = async () => {
    await signOut();
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button px={15}>
          <AiOutlineMenu />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Box px="sm">{user?.name}</Box>
        <Menu.Divider />
        {/* <Menu.Label>Application</Menu.Label> */}
        <Link href="/dashboard" style={{ textDecorationLine: "none" }}>
          <Menu.Item
            leftSection={
              <AiOutlineHome style={{ width: rem(14), height: rem(14) }} />
            }
          >
            ホーム
          </Menu.Item>
        </Link>
        <Link
          href="/dashboard/alcohol-check"
          style={{ textDecorationLine: "none" }}
        >
          <Menu.Item
            leftSection={
              <PiBeerSteinBold style={{ width: rem(14), height: rem(14) }} />
            }
          >
            アルコールチェック
          </Menu.Item>
        </Link>
        <Menu.Divider />
        <Menu.Item
          onClick={logout}
          leftSection={<GrLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default HeaderMenu;
