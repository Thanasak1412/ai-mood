import { redirect } from "next/navigation";

import { syncNewUser } from "@/utils/auth";
import { currentUser } from "@clerk/nextjs";
import { User as ClerkUser } from "@clerk/nextjs/dist/types/server";

const createNewUser = async (clerkUser: ClerkUser | null) => {
  if (!clerkUser) {
    return;
  }

  await syncNewUser(clerkUser);

  redirect('/journal');
};

export default async function Page() {
  const clerkUser = await currentUser();
  await createNewUser(clerkUser);

  return <>...loading</>;
}
