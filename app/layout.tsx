import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./NavBar";

export const metadata: Metadata = {
  title: "Groomate",
  description: "A salon management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
