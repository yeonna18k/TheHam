import { GetUsersAchievementResponse } from '@/api/userApi';
import { format } from 'date-fns';
import { PiggyBank } from 'lucide-react';
import IconCardLayout from '../common/IconCardLayout';

export default function AchievementsCard({
  title,
  content,
  createdAt,
}: GetUsersAchievementResponse) {
  return (
    <IconCardLayout className="gap-4 ">
      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <PiggyBank size={24} className="text-primary" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="title4">{title}</div>
        <div className="body2 text-gray-500 break-keep">{content}</div>
        <div className="body3 text-gray-500">
          획득일: {format(createdAt, 'yyyy-MM-dd')}
        </div>
      </div>
    </IconCardLayout>
  );
}
