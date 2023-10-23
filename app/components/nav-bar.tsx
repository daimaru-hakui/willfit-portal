'use client';
import React, { FC } from 'react';
import { Navbar, Button } from '../lib/material-tailwind';
import { navList } from '@/utils/nav-list';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const NavBar: FC = () => {
  const logout = async () => {
    await signOut();
  };
  return (
    <Navbar className="sticky top-0 z-10 py-1 h-max max-w-full rounded-none shadow-sm">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link href="/dashboard" className="mr-4 cursor-pointer py-1.5 font-bold">
          Willfit ポータルサイト
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block places-items-center">{navList}</div>
          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="sm"
              onClick={logout}
              color='blue'
              className='shadow-sm hover:shadow-md'
            >
              <span>logout</span>
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;