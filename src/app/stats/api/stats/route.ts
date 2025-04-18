export async function GET() {
    const categoryData = [
      { name: '식비', value: 300000, color: '#4ade80' },
      { name: '카페', value: 150000, color: '#60a5fa' },
      { name: '쇼핑', value: 200000, color: '#f472b6' },
      { name: '여가', value: 120000, color: '#a78bfa' },
      { name: '건강', value: 80000, color: '#fb923c' },
      { name: '주거', value: 350000, color: '#94a3b8' },
      { name: '교통', value: 70000, color: '#fbbf24' },
      { name: '기타', value: 50000, color: '#cbd5e1' },
    ];
  
    return Response.json({ categoryData });
  }
  