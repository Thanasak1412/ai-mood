import { JournalEntry } from "@prisma/client";

type Props = {
  entry: JournalEntry;
};

export default function EntryCard({ entry }: Readonly<Props>) {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow px-4">
      <li className="py-5">{date}</li>
      <li className="py-5">Summary</li>
      <li className="py-4">Mood</li>
    </ul>
  );
}
