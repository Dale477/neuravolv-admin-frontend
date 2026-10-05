import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neuravolv Administration",
  description: "Neuravolv Platform Administrative Control Plane"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
