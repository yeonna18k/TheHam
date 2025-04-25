import { useRouter } from 'next/router';
import ChallengeForm from '@/components/ChallengeForm/ChallengeForm';

export default function EditChallengePage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div className="p-4 text-center">잘못된 접근입니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ChallengeForm />
    </div>
  );
}