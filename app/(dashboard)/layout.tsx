import Link from "next/link";
import { ReactNode } from "react";

import { jetBrains_mono } from "@/app/font";
import { UserButton } from "@clerk/nextjs";

const menus = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Journal',
    link: '/journal',
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <aside className="h-full flex-1 basis-[12.5rem] border-r border-black/10">
        <h1
          className={`${jetBrains_mono.className} border-b border-black/10 py-3 text-center text-3xl font-light leading-[35px]`}
        >
          Mood
        </h1>
        <ul className="mt-10 flex flex-1 flex-col items-center gap-8">
          {menus.map((menu) => (
            <li key={menu.link} className="mx-auto">
              <Link href={menu.link}>{menu.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
      </aside>
      <div className="flex h-full basis-full flex-col">
        <header className="h-16 border-b border-black/10">
          <div className="flex h-full items-center justify-end pr-8">
            <UserButton />
          </div>
        </header>
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
