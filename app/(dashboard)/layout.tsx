import { ReactNode } from "react";

import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="w-screen h-screen flex">
      <aside className="h-full flex-1 basis-[12.5rem] border-r border-black/10">
        mood
      </aside>
      <div className="h-full flex flex-col basis-full">
        <header className="h-16 border-b border-black/10">
          <div className="h-full flex items-center justify-end pr-8">
            <UserButton />
          </div>
        </header>
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
