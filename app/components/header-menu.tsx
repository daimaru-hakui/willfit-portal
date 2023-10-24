import { Menu, Button, rem } from "@mantine/core";
import { signOut } from "next-auth/react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const HeaderMenu = () => {
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
