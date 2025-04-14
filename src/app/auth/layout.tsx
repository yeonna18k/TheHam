import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-100 p-6 flex flex-col gap-9">
      <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
        <Image
          src="/icons/icon-192x192.png"
          width={24}
          height={24}
          alt="logo"
        />
        Growith
      </h2>
      {children}
    </section>
  );
}
