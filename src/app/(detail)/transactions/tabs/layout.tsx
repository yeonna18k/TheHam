import DetailHeader from '@/components/layout/DetailHeader';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DetailHeader>내역</DetailHeader>
      <section className="h-full px-4 py-6">{children}</section>
      <Link
        href="/transactions/detail"
        className="fixed bottom-6 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/80 transition-colors"
      >
        <Plus className="w-8 h-8 text-white" />
      </Link>
    </>
  );
}
