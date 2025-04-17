'use client';

import { useRouter } from 'next/navigation';

interface ChallengeDetailHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const ChallengeDetailHeader = ({ title, showBackButton = true }: ChallengeDetailHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      {showBackButton && (
        <button
          onClick={() => router.back()}
          className="text-gray-600 p-2 hover:bg-gray-200 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h1 className="text-lg font-semibold text-center flex-1">{title}</h1>
      <div className="w-4" /> 
    </div>
  );
};
