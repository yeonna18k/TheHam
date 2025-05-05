import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ChallengeJoinButton({
  challengeId,
}: {
  challengeId: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/challenge/${challengeId}`);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="w-full bg-white border-gray-300 text-black title5"
    >
      참여하기
    </Button>
  );
}
