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

export async function updateJournal(id: string, content: string) {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),
  );

  if (!res.ok) {
    return null;
  }

  const { data } = (await res.json()) as unknown as { data: JournalEntry };

  return data;
}

export async function askQuestion(body: HTMLFormElement) {
  const formData = new FormData(body);

  const res = await fetch(
    new Request(createUrl('/api/question'), {
      method: 'POST',
      body: formData,
    }),
  );

  if (!res.ok) {
    throw new Error('Error while to ask question');
  }

  const { data } = (await res.json()) as unknown as { data: string };

  return data;
}
