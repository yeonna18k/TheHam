'use client';

import { getUsersChallenge } from '@/api/userApi';
import { CHALLENGES_STATICS } from '@/mock/challengeStatisticsData';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'react-lottie-player';
import errorData from '../../../public/lottie/query_error.json';
import StatisticsCard from './StatisticsCard';

export default function StatisticsWrapper() {
  const { data, isError } = useQuery({
    queryKey: ['usersChallenge'],
    queryFn: getUsersChallenge,
  });

  if (isError) return <Lottie animationData={errorData} />;

  const entries = Object.entries(data ?? {});
  const challenges = entries.map(([key, value]) => {
    if (key in CHALLENGES_STATICS) {
      return {
        description:
          CHALLENGES_STATICS[key as keyof typeof CHALLENGES_STATICS]
            .description,
        type: CHALLENGES_STATICS[key as keyof typeof CHALLENGES_STATICS].type,
        order: CHALLENGES_STATICS[key as keyof typeof CHALLENGES_STATICS].order,
        value,
      };
    }
    return null;
  });

  return (
    <div className="flex flex-col gap-4">
      {data && (
        <>
          {challenges
            .sort((a, b) => (a && b ? a.order - b.order : 0))
            .map((stat) => {
              if (stat) {
                return (
                  <StatisticsCard
                    key={stat?.description}
                    type={stat.type}
                    value={stat.value}
                    description={stat.description}
                  />
                );
              }
            })}
        </>
      )}
    </div>
  );
}
