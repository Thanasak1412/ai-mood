import HistoryCharts from "@/components/HistoryCharts";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getData() {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    select: {
      analysis: {
        select: {
          color: true,
          createdAt: true,
          mood: true,
          sentimentScore: true,
        },
      },
    },
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  let numOfAnalyses = 0;
  let sum = 0;

  if (Array.isArray(entries) && entries.length > 0) {
    sum = entries.reduce((acc, curr, i) => {
      numOfAnalyses++;
      if (curr.analysis?.sentimentScore) {
        return acc + curr.analysis.sentimentScore;
      }

      return acc;
    }, 0);
  }

  const avg = numOfAnalyses > 0 ? sum / numOfAnalyses : 0;

  const analyses = entries.map(({ analysis }) => {
    if (!analysis?.color || !analysis?.createdAt || !analysis?.mood) {
      throw new Error('Invalid analysis data');
    }

    return {
      color: analysis?.color,
      createdAt: analysis?.createdAt,
      mood: analysis?.mood,
      sentimentScore: analysis?.sentimentScore,
    };
  });

  return { analyses, avg };
}

export default async function Page() {
  const { analyses, avg } = await getData();

  return (
    <div className="h-full w-full overflow-y-auto">
      <div
        className={`border-b border-black/10 px-6 py-4 ${handleAvgColor(avg)}`}
      >
        Avg. Sentiment: {avg}
      </div>
      <div className="mb-14 h-full w-full">
        <HistoryCharts analyses={analyses} />
      </div>
    </div>
  );
}

function handleAvgColor(avg: number) {
  if (avg < 0) {
    return 'text-red-600';
  }

  return avg > 5 ? 'text-green-600' : 'text-black/40';
}
