import { PiggyBank, Users, Trophy } from "lucide-react"
import Link from "next/link"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <PiggyBank className="h-6 w-6 text-green-500" />
            <span>Growith</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              기능
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              이용방법
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              후기
            </Link>
          </nav>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              함께 <span className="text-green-500">절약</span>하고, 함께 <span className="text-green-500">성장</span>
              하세요
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Growith와 함께 친구들과 절약 챌린지를 시작하고, 건강한 금융 습관을 만들어보세요.
            </p>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Growith의 특별한 기능</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 rounded-full bg-green-100 mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">함께하는 챌린지</h3>
                <p className="text-muted-foreground">친구들과 함께 절약 목표를 설정하고 서로 응원하며 달성해보세요.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 rounded-full bg-green-100 mb-4">
                  <PiggyBank className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">절약 습관 형성</h3>
                <p className="text-muted-foreground">일상 속 작은 절약부터 시작해 건강한 금융 습관을 만들어보세요.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 rounded-full bg-green-100 mb-4">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">보상 시스템</h3>
                <p className="text-muted-foreground">목표를 달성하면 다양한 보상과 뱃지를 획득할 수 있어요.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-10 bg-gray-50">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold mb-4 md:mb-0">
            <PiggyBank className="h-5 w-5 text-green-500" />
            <span>Growith</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Growith. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
