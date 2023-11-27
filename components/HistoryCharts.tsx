'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis
} from "recharts";
import {
  NameType,
  ValueType
} from "recharts/types/component/DefaultTooltipContent";

import { Analysis } from "@prisma/client";

type Props = {
  analyses: Pick<Analysis, 'color' | 'createdAt' | 'mood' | 'sentimentScore'>[];
};

function CustomTooltip({
  payload,
  label,
  active,
}: TooltipProps<ValueType, NameType>) {
  const dateLabel = new Date(label).toLocaleDateString('en-us', {
    day: 'numeric',
    weekday: 'long',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  if (!active || !payload?.length) {
    return null;
  }

  const analysis = payload[0].payload;

  return (
    <div className="custom-tooltip relative rounded-lg border border-black/10 bg-white/5 p-8 shadow-md backdrop-blur-md">
      <div
        className="absolute left-2 top-2 h-2 w-2 rounded-full"
        style={{ background: analysis.color }}
      ></div>
      <p className="label text-sm text-black/30">{dateLabel}</p>
      <p className="intro text-xl uppercase">{analysis.mood}</p>
    </div>
  );
}

export default function HistoryCharts({ analyses }: Readonly<Props>) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={analyses}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" height={28} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}
