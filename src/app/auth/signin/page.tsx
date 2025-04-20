import { Button } from '@/components/ui/button';

export default function SignIn() {
  return (
    <section className="flex flex-col gap-6 items-center justify-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold">로그인</h1>
      <span className="text-center text-sm text-gray-600">
        Growith에 가입하고 친구들과 함께
        <br />
        절약 챌린지를 시작하세요!
      </span>
      <Button variant="login">카카오로 시작하기</Button>
      <span className="text-center text-sm text-gray-600">또는</span>
      <Button variant="login">카카오로 로그인</Button>
    </section>
  );
}
