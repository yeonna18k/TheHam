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

export const CATEGORY_MAP: Record<string, { name: string; color: string; english: string }> = {
  식비: { name: '식비', color: '#4ade80', english: 'food' },
  카페: { name: '카페', color: '#60a5fa', english: 'cafe_snack' },
  편의점: { name: '편의점', color: '#fbbf24', english: 'convenience_store' },
  술_여가: { name: '술/여가', color: '#a78bfa', english: 'alcohol_entertainment' },
  쇼핑: { name: '쇼핑', color: '#f472b6', english: 'shopping' },
  취미: { name: '취미', color: '#fb923c', english: 'hobby' },
  건강: { name: '건강', color: '#94a3b8', english: 'health' },
  주거_통신: { name: '주거/통신', color: '#fbbf24', english: 'housing_communication' },
  금융: { name: '금융', color: '#f472b6', english: 'finance' },
  뷰티: { name: '뷰티', color: '#60a5fa', english: 'beauty' },
  교통: { name: '교통', color: '#a78bfa', english: 'transportation' },
  여행: { name: '여행', color: '#4ade80', english: 'travel' },
  교육: { name: '교육', color: '#fb923c', english: 'education' },
  생활: { name: '생활', color: '#94a3b8', english: 'living' },
  기부: { name: '기부', color: '#cbd5e1', english: 'donation' },
  카드_결제: { name: '카드 결제', color: '#d1d5db', english: 'card_payment' },
  후불_결제: { name: '후불 결제', color: '#d1d5db', english: 'deferred_payment' },
  기타: { name: '기타', color: '#cbd5e1', english: 'none' },
};


