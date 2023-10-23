import Link from 'next/link';
import { Button, Typography } from '../app/lib/material-tailwind';

export const navList = (
  <ul className="mt-2 mb-4 flex gap-1">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link
        href={`https://myuni.vercel.app/catalog`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          variant="text"
          size="sm"
          className="hidden lg:inline-block px-2"
        >
          <span>マイユニポータル</span>
        </Button>
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link
        href={`https://daimaru-maker-zaiko.vercel.app/daimaru`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          variant="text"
          size="sm"
          className="hidden lg:inline-block px-2"
        >
          <span>WEB在庫</span>
        </Button>
      </Link>
    </Typography>
  </ul>
);