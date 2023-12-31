import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, NavLink } from "@mantine/core";
import Link from "next/link";
import { navList } from "@/utils/nav-list";

const HeaderDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="menu" position="top">
        {navList.map(({ title, path,target }, index) => (
          <NavLink
            key={index}
            label={title}
            component={Link}
            href={path}
            target={target ? "_blank"  : "_self"}
            rel="noopener noreferrer"
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
