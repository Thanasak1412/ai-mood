import Link from "next/link";

import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();

  const href = userId ? '/journal' : '/new-user';

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="max-w-xl w-full text-white mx-auto">
        <h1 className="text-6xl mb-4">The best journal app, period.</h1>
        <p className="text-2xl text-white/60 mb-4">
          This is the best app for tracking your mood throughout your life. All
          your have to do is the honest
        </p>
        <Link href={href}>
          <button className="bg-blue-600 rounded-lg text-xl px-4 py-2">
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
}
