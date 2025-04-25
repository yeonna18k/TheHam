import { Minus } from 'lucide-react';

export default function TransactionsLogCard() {
  return (
    <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className="rounded-full bg-warning/20 w-9 h-9 flex items-center justify-center">
          <Minus className="text-warning" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="title4">식비</span>
          <span className="body3 text-gray-500">2025. 04. 14.</span>
        </div>
      </div>
      <div className="text-warning title4">{-9000}</div>
    </div>
  );
}
