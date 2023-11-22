import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getEntries() {
  const user = await getUserByClerkId();

  return await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
  });
}

export default async function Page() {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-12">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 grid-flow-row gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
