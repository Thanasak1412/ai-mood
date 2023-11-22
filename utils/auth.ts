import { currentUser } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/dist/types/server";
import { Prisma } from "@prisma/client";

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

export async function getUserByClerkId(options?: object) {
  const clerkUser = await currentUser();

  const option: Prisma.UserFindUniqueArgs = {
    where: {
      clerkId: clerkUser?.id,
    },
    ...options,
  };

  return await prisma.user.findUniqueOrThrow(option);
}
