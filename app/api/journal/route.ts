import { NextResponse } from "next/server";

import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

export async function POST() {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: `Write about your day at ${new Date().toLocaleDateString(
        'en-us',
        {
          day: 'numeric',
          weekday: 'long',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
      )}`,
    },
  });

  const analyzed = await analyze(entry.content);

  if (!analyzed) {
    return NextResponse.json({
      status: false,
      message: analyzed ?? 'Error while analyzing this content',
    });
  }

  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analyzed,
    },
  });

  return NextResponse.json({ data: entry });
}
