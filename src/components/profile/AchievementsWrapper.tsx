'use client';

import { getUsersAchievement } from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'react-lottie-player';
import {
  default as errorData,
  default as loadingData,
} from '../../../public/lottie/piggy_loading.json';
import AchievementsCard from './AchievementsCard';

export default function AchievementsWrapper() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['achievement'],
    queryFn: getUsersAchievement,
  });

  if (isError) return <Lottie animationData={errorData} />;
  if (isPending) return <Lottie animationData={loadingData} />;

  return (
    <div className="flex flex-col gap-4">
      {data?.map((achievement) => (
        <AchievementsCard key={achievement.title} {...achievement} />
      ))}
    </div>
  );
}
