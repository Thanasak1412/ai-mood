import { NextResponse } from "next/server";
import { z } from "zod";

import { qa } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const schema = z.object({
  question: z.string(),
});

export async function POST(req: Request) {
  const body = await req.formData();
  const formDataObj: { [key: string]: string } = {};

  for (const [key, value] of body.entries()) {
    formDataObj[key] = value as string;
  }

  const { question } = schema.parse(formDataObj);
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
}
