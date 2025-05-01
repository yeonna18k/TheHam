import { PiggyBank } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-100 p-6 flex flex-col gap-9 h-screen max-w-md mx-auto">
      <h2 className="flex items-center justify-center gap-2 title2 text-gray-900">
        <PiggyBank size={24} className="text-primary" />
        더함
      </h2>
      <section className=" h-fit bg-white py-6 px-3 rounded-lg">
        {children}
      </section>
    </section>
  );
}
