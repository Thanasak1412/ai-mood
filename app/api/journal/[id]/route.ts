import { NextResponse } from "next/server";

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
    data: { content },
  });

  return NextResponse.json({ data: updatedJournal });
}
