import { type Metadata } from "next/types";

export const metadata: Metadata = {
  title: "TAWS | Blog",
  description: "TAWS",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
