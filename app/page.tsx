import Link from "next/link";

import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();

  const href = userId ? '/journal' : '/new-user';

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="mx-auto w-full max-w-xl text-white">
        <h1 className="mb-4 text-6xl">The best journal app, period.</h1>
        <p className="mb-4 text-2xl text-white/60">
          This is the best app for tracking your mood throughout your life. All
          your have to do is the honest
        </p>
        <Link href={href}>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-xl">
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
}
