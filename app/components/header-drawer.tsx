import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, NavLink } from "@mantine/core";
import { navList } from "@/utils/nav-list";
import Link from "next/link";

const HeaderDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="menu" position="top">
        {navList.map(({ title, path }, index) => (
          <NavLink
            key={index}
            label={title}
            component={Link}
            href={path}
            onClick={() => close()}
          />
        ))}
      </Drawer>

      <Button variant="outline" onClick={open}>
        menu
      </Button>
    </>
  );
};

export default HeaderDrawer;
