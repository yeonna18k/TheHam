import { Check } from 'lucide-react';
import Link from 'next/link';

export const ChallengeItem = ({ title, progress, daysLeft }) => {
  return (
    <Link
      href={`/challenges/?id=${id}`}
      className="rounded-sm p-4 flex justify-between items-center border"
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-9 h-9 bg-primary rounded-full flex items-center justify-center`}
        >
          <Check size={24} className="text-white" />
        </div>
        <div>
          <p className="title4">{title}</p>
          <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-1">
            <div
              className="bg-green-400 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <span className="text-gray-500 body2">D-{daysLeft}</span>
    </Link>
  );
};
