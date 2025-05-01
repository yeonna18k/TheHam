"use client"
import { useSearchParams } from 'next/navigation';
import ChallengeForm from '@/components/ChallengeForm/ChallengeForm';

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