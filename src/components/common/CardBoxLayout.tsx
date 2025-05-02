import React from 'react';

export default function CardBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm px-3 py-6 flex flex-col gap-4 flex-grow">
      {children}
    </div>
  );
}
