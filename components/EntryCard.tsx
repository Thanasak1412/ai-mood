import { JournalEntry } from "@prisma/client";

type Props = {
  entry: JournalEntry;
};

export default function EntryCard({ entry }: Readonly<Props>) {
  return <>Entry component</>;
}
