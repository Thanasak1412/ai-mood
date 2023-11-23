import { JournalEntry } from "@prisma/client";

function createUrl(path: string) {
  return `${window.location.origin}${path}`;
}

export async function createNewJournal() {
  const res = await fetch(
    new Request(createUrl('/api/journal'), {
      method: 'POST',
    }),
  );

  if (res.ok) {
    const { data } = (await res.json()) as unknown as { data: JournalEntry };

    return data;
  }
}
