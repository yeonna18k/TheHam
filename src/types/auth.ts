export interface SignUpRequest {
  nickname: string;
  categories: string[];
}

export type EmptyResponse = Record<string, never>;
