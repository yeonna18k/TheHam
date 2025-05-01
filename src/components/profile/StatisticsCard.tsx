import { cn } from '@/lib/utils';
import { ChallengeStatistics } from '@/mock/challengeStatisticsData';
import { PiggyBank } from 'lucide-react';
import IconCardLayout from '../common/IconCardLayout';

export default function StatisticsCard({
  type,
  description,
  value,
}: Pick<ChallengeStatistics, 'type' | 'description' | 'value'>) {
  return (
    <IconCardLayout className="gap-2 flex-col items-center ">
      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <PiggyBank size={24} className="text-primary" />
      </div>
      <p className="body1 text-gray-500">{description}</p>
      <h1
        className={cn('h1', {
          'text-primary': type === 'amount',
        })}
      >
        {type === 'amount' ? `₩ ${value?.toLocaleString()}` : value}
      </h1>
    </IconCardLayout>
  );
}
