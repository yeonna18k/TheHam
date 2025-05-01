import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface DonutChartData {
  name: string;
  value: number;
  color?: string;
}

export function DonutChart({ data }: { data: DonutChartData[] }) {
  if (!data || data.length === 0) {
    return <div></div>; // 데이터가 없을 때 표시
  }
  return (
    <div className="w-full aspect-square max-w-xs mx-auto mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
