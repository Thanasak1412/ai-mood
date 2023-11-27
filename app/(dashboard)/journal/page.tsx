import Link from "next/link";

import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getEntries() {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    include: {
      analysis: {
        select: {
          summary: true,
          mood: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return entries;
}

export default async function Page() {
  const entries = await getEntries();

  return (
    <div className="mb-8 h-full overflow-y-auto bg-zinc-400/10 p-12">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="mb-7 mt-4 w-full">
        <Question />
      </div>
      <div className="mb-8 grid grid-flow-row grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
