import React, { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode; }) => {
  return (
    <div className='grid place-items-center h-screen'>{children}</div>
  );
};

export default LoginLayout;