import { PiggyBank, Users, Trophy, Menu } from 'lucide-react';
import Link from 'next/link';
import '@/lib/firebase/settingFCM';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-md mx-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <PiggyBank className="h-6 w-6 text-green-500" />
            <span>MonChall</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/main"
              className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              시작하기
            </Link>
            <Menu className="h-6 w-6 md:hidden" />
          </div>
        </div>
      </header>
      <main className="flex-1 px-4">
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              함께 <span className="text-green-500">절약</span>하고,
            </h1>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              함께 <span className="text-green-500">성장</span>하세요
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              MonChall와 함께 친구들과 절약 챌린지를 시작하고, 건강한 금융
              습관을 만들어보세요.
            </p>
            <div className="flex justify-center mt-4">
              <Link
                href="/main"
                className="w-30 block px-6 py-3 font-medium bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-center"
              >
                시작하기
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-12">
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">
              Growith의 특별한 기능
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
                <div className="p-3 rounded-full bg-green-100 mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">함께하는 챌린지</h3>
                <p className="text-muted-foreground">
                  친구들과 함께 절약 목표를 설정하고 서로 응원하며 달성해보세요.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
                <div className="p-3 rounded-full bg-green-100 mb-4">
                  <PiggyBank className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">절약 습관 형성</h3>
                <p className="text-muted-foreground">
                  일상 속 작은 절약부터 시작해 건강한 금융 습관을 만들어보세요.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
                <div className="p-3 rounded-full bg-green-100 mb-4">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">보상 시스템</h3>
                <p className="text-muted-foreground">
                  목표를 달성하면 다양한 보상과 뱃지를 획득할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 bg-gray-50 px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 font-bold mb-3">
            <PiggyBank className="h-5 w-5 text-green-500" />
            <span>Growith</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MonChall. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
