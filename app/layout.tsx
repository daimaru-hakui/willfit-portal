import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "../lib/next-auth/SessionProvider";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Willfit ポータルサイト",
  description: "Willfit ポータルサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <head>
        <ColorSchemeScript />
      </head>
      <html lang="ja">
        <body>
          <MantineProvider>{children}</MantineProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
