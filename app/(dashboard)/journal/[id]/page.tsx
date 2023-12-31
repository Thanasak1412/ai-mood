import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

export const revalidate = 2;

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        id,
        userId: user.id,
      },
    },
    include: {
      analysis: {
        select: {
          mood: true,
          subject: true,
          summary: true,
          negative: true,
          color: true,
        },
      },
    },
  });

  return entry;
};

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Readonly<Props>) {
  const entry = await getEntry(params.id);

  if (!entry?.analysis) {
    throw new Error('Failed to get entry');
  }

  const { mood, subject, summary, negative, color } = entry?.analysis ?? {};

  const analysisData = [
    { label: 'Summary', value: mood },
    { label: 'Subject', value: subject },
    { label: 'Mood', value: summary },
    { label: 'Negative', value: negative ? 'True' : 'False' },
  ];

  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-2">{entry && <Editor entry={entry} />}</div>
      <div className="border-l border-black/10 pb-4">
        <h2
          className="w-full px-8 py-6 text-2xl"
          style={{ backgroundColor: color }}
        >
          Analysis
        </h2>
        <ul className="divide-y divide-black/10 border-b text-lg font-semibold">
          {analysisData.map((item) => (
            <div
              className="flex flex-row flex-wrap items-center justify-between p-4"
              key={item.label}
            >
              <li>{item.label}</li>
              <li className="ml-auto text-end text-base font-normal">
                {item.value}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
