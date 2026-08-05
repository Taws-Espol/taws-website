import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">TAWS blog</h1>

      <Link href="/">Go to home page</Link>
      <Link href="/about">Go to about page</Link>
      <Link href="/blog">Go to blog page</Link>
      <Link href="/projects">Go to projects page</Link>
    </main>
  );
}
