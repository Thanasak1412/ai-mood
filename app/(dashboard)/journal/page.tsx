import Link from "next/link";

import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getEntries() {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  analyze(
    'Today was a eh, ok day I guess. I found a new coffee shop that was cool but then I got a flat tire. :)',
  );

  return entries;
}

export default async function Page() {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-12">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="grid grid-flow-row grid-cols-3 gap-4">
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
