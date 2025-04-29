import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function DetailHeader({
  children,
  returnLink = '/main',
}: {
  children: ReactNode;
  returnLink?: string;
}) {
  return (
    <header className="relative py-3 border-b border-gray-200 title2 flex items-center justify-center max-w-md mx-auto">
      <Link className="absolute left-3" href={returnLink}>
        <ChevronLeft size={24} />
      </Link>
      {children}
    </header>
  );
}
