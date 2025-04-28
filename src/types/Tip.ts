// POST 요청 바디 타입
export interface PostTipsRequest {
    challengeId: number;
    content: string;
  }
  
  // POST 응답 타입 (예시로 OK만 반환하므로 빈 객체로 처리)
 export type PostTipsResponse = object