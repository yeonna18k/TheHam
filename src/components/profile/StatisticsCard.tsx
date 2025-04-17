import { cn } from "@/lib/utils";
import { ChallengeStatistics } from "@/mock/challengeStatisticsData";
import { PiggyBank } from "lucide-react";

export default function StatisticsCard({
  type,
  description,
  amount,
  count,
}: ChallengeStatistics) {
  return (
    <div className="p-4 border border-gray-200 rounded-md flex gap-2 flex-col items-center">
      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <PiggyBank size={24} className="text-primary" />
      </div>
      <p className="body1 text-gray-500">{description}</p>
      <h1
        className={cn("h1", {
          "text-primary": type === "amount",
        })}
      >
        {type === "amount" ? `₩ ${amount?.toLocaleString()}` : count}
      </h1>
    </div>
  );
}
