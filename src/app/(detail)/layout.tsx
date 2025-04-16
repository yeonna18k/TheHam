export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-gray-100 h-screen">{children}</section>;
}
