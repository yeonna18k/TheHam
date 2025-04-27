export const CATEGORIES = [
  { id: 1, korean: '식비', english: 'food' },
  { id: 2, korean: '카페 / 간식', english: 'cafe_snack' },
  { id: 3, korean: '편의점 / 마트 / 잡화', english: 'convenience_store' },
  { id: 4, korean: '술 / 유흥', english: 'alcohol_entertainment' },
  { id: 5, korean: '쇼핑', english: 'shopping' },
  { id: 6, korean: '취미 / 여가', english: 'hobby' },
  { id: 7, korean: '의료 / 건강 / 피트니스', english: 'health' },
  { id: 8, korean: '주거 / 통신', english: 'housing_communication' },
  { id: 9, korean: '보험 / 세금 / 기타금융', english: 'finance' },
  { id: 10, korean: '미용', english: 'beauty' },
  { id: 11, korean: '교통 / 자동차', english: 'transportation' },
  { id: 12, korean: '여행 / 숙박', english: 'travel' },
  { id: 13, korean: '교육', english: 'education' },
  { id: 14, korean: '생활', english: 'living' },
  { id: 15, korean: '기부 / 후원', english: 'donation' },
  { id: 16, korean: '카드대금', english: 'card_payment' },
  { id: 17, korean: '후불결제대금', english: 'deferred_payment' },
  { id: 18, korean: '이체', english: 'transfer' },
  { id: 19, korean: '급여', english: 'salary' },
  { id: 20, korean: '저축 / 투자', english: 'saving_investment' },
  { id: 21, korean: '카테고리 미설정', english: 'none' },
] as const;

// 카테고리 ID 타입
export type CategoryId = (typeof CATEGORIES)[number]['id'];

// 유틸리티 함수 - ID로 카테고리 찾기
export const getCategoryById = (id: CategoryId) => {
  return CATEGORIES.find((category) => category.id === id);
};

// 유틸리티 함수 - 이름으로 카테고리 찾기
export const getCategoryByKorean = (korean: string) => {
  return CATEGORIES.find((category) => category.korean === korean);
};
export const getCategoryByEnglish = (english: string) => {
  return CATEGORIES.find((category) => category.english === english);
};

export const CATEGORY_MAP: Record<string, { name: string; color: string; english: string }> = CATEGORIES.reduce((acc, { korean, english }) => {
  acc[korean] = {
    name: korean,
    color: generateCategoryColor(korean),  // 색상 매핑 함수 필요
    english,
  };
  return acc;
}, {} as Record<string, { name: string; color: string; english: string }>);

// 임의로 색상을 매핑하는 함수 (예시)
function generateCategoryColor(korean: string): string {
  const colors = {
    식비: '#4ade80',
    카페: '#60a5fa',
    편의점: '#fbbf24',
    술_여가: '#a78bfa',
    쇼핑: '#f472b6',
    취미: '#fb923c',
    건강: '#94a3b8',
    주거_통신: '#fbbf24',
    금융: '#f472b6',
    뷰티: '#60a5fa',
    교통: '#a78bfa',
    여행: '#4ade80',
    교육: '#fb923c',
    생활: '#94a3b8',
    기부: '#cbd5e1',
    카드_결제: '#d1d5db',
    후불_결제: '#d1d5db',
    기타: '#cbd5e1',
  };

  return colors[korean as keyof typeof colors] || '#000000'; // 기본 색상
}
