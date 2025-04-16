import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="relative py-3 border-b border-gray-200 title2 flex items-center justify-center">
        <Link className="absolute left-3" href="/main">
          <ChevronLeft size={24} />
        </Link>
        프로필
      </header>

      {children}
    </section>
  );
}
