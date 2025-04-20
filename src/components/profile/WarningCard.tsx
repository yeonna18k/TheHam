import { cn } from '@/lib/utils';
import { WarningCard } from '@/mock/warningCardsData';
import { PiggyBank } from 'lucide-react';
import IconCardLayout from '../common/IconCardLayout';

export default function WarningsCard({
  // type,
  severity,
  title,
  description,
}: WarningCard) {
  return (
    <IconCardLayout
      className={cn('gap-2 flex-col items-center', {
        'text-primary': severity === 'low',
        'text-social-kakao': severity === 'medium',
        'text-warning': severity === 'high',
      })}
    >
      <div
        className={cn(
          'w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0',
          {
            'bg-primary/20': severity === 'low',
            'bg-social-kakao/20': severity === 'medium',
            'bg-warning/20': severity === 'high',
          }
        )}
      >
        <PiggyBank size={24} className="" />
      </div>
      <h1 className="h1">{title}</h1>
      <p className="body1 text-gray-500 break-keep text-center">
        {description}
      </p>
    </IconCardLayout>
  );
}
