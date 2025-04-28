import DetailHeader from '@/components/layout/DetailHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DetailHeader returnLink="/transactions/tabs">내역 추가</DetailHeader>
      <section className="h-full px-4 py-6">{children}</section>
    </>
  );
}
