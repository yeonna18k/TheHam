'use client';

import { getUsersAchievement } from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';
import { Trophy } from 'lucide-react';
import Lottie from 'react-lottie-player';
import loadingData from '../../../public/lottie/piggy_loading.json';
import errorData from '../../../public/lottie/query_error.json';
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
      {data.length > 0 ? (
        data?.map((achievement) => (
          <AchievementsCard key={achievement.title} {...achievement} />
        ))
      ) : (
        <div className="flex flex-col items-center text-gray-500 gap-10 my-20">
          <Trophy size={80} />
          <span className="text-center">
            아직 업적이 없어요.
            <br /> 예산을 설정하고 챌린지에 참여하여
            <br /> 업적을 달성해보세요!
          </span>
        </div>
      )}
    </div>
  );
}
