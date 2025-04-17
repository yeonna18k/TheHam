import React from "react";

export default function IconCardLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-4 border border-gray-200 rounded-md flex bg-white ${className}`}
    >
      {children}
    </div>
  );
}
