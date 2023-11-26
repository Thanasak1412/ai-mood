import { NextResponse } from "next/server";

import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { content } = await req.json();

  const user = await getUserByClerkId();

  const updatedJournal = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    include: {
      analysis: true,
    },
    data: { content },
  });

  const analyzed = await analyze(updatedJournal.content);

  if (!analyzed) {
    return NextResponse.json({
      status: false,
      message: 'Error while update journalEntry data',
    });
  }

  const updatedAnalyzed = await prisma.analysis.upsert({
    where: { entryId: updatedJournal.id },
    create: {
      ...analyzed,
      entryId: updatedJournal.id,
    },
    update: analyzed,
  });

  return NextResponse.json({
    data: { ...updatedJournal, analysis: updatedAnalyzed },
  });
}
