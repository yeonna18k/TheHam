import { cn } from "@/lib/utils";
import { WarningCard } from "@/mock/warningCardsData";
import { PiggyBank } from "lucide-react";

export default function WarningCard({
  type,
  severity,
  title,
  description,
}: WarningCard) {
  return (
    <div
      className={cn(
        "p-4 border border-gray-200 rounded-md flex gap-2 flex-col items-center",
        {
          "text-primary": severity === "low",
          "text-social-kakao": severity === "medium",
          "text-warning": severity === "high",
        }
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0",
          {
            "bg-primary/20": severity === "low",
            "bg-social-kakao/20": severity === "medium",
            "bg-warning/20": severity === "high",
          }
        )}
      >
        <PiggyBank size={24} className="" />
      </div>
      <h1 className="h1">{title}</h1>
      <p className="body1 text-gray-500 break-keep text-center">
        {description}
      </p>
    </div>
  );
}
