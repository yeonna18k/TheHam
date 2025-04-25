import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ChallengeJoinButton({ challengeId }: { challengeId: string }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/challenge/${challengeId}`)
  }

  return (
    <Button
      onClick={handleClick}
      className="w-full h-12 rounded-full bg-white border border-gray-300 text-black text-sm"
    >
      참여하기
    </Button>
  )
}