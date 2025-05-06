'use client';
import ChallengeForm from '@/components/challengeForm/ChallengeForm';
import { useSearchParams } from 'next/navigation';

export default function EditChallengePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) {
    return <div className="p-4 text-center">잘못된 접근입니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ChallengeForm />
    </div>
  );
}
