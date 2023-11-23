import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getEntry(id: string) {
  const user = await getUserByClerkId();

  return await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        id,
        userId: user.id,
      },
    },
  });
}

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Readonly<Props>) {
  const entry = await getEntry(params.id);

  return (
    <div className="w-full h-full">{entry && <Editor entry={entry} />}</div>
  );
}
