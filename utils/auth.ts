import { User as ClerkUser } from "@clerk/nextjs/dist/types/server";

import { prisma } from "./db";

export async function syncNewUser(clerkUser: ClerkUser) {
  const newUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id,
    },
  });

  if (newUser) {
    return;
  }

  await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });
}
