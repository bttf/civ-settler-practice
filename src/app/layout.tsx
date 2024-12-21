import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civ Settler Practice",
  description: "Pick the best tile to settle your first city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
