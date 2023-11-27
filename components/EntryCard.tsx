import { Analysis, JournalEntry } from "@prisma/client";

type Props = {
  entry: {
    analysis: Pick<Analysis, 'summary' | 'mood'> | null;
  } & JournalEntry;
};

export default function EntryCard({ entry }: Readonly<Props>) {
  const date = new Date(entry.createdAt).toDateString();

  if (!entry.analysis) {
    return;
  }

  const { summary, mood } = entry.analysis;

  return (
    <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white px-4 shadow">
      <li className="py-5">{date}</li>
      <li className="py-5">Summary: {summary}</li>
      <li className="py-4">Mood: {mood}</li>
    </ul>
  );
}
