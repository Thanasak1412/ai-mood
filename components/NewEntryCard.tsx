'use client';

import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

import { createNewJournal } from "@/utils/api";

export default function NewEntryCard() {
  const router = useRouter();

  const onNewEntry = async () => {
    const entry = await createNewJournal();

    router.push(`/journal/${entry?.id}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onNewEntry();
    }
  };

  return (
    <div className="cursor-pointer overflow-hidden rounded-xl bg-white shadow">
      <div className="h-full w-full px-4 py-5 sm:p-5">
        <span
          className="block h-full w-full text-3xl"
          onClick={onNewEntry}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          New Entry
        </span>
      </div>
    </div>
  );
}
