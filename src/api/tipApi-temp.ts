"use client"

import { baseFetch } from "./BaseAPI"
import type { PostTipsRequest, PostTipsResponse } from "@/types/Tip"

// 팁 get
export async function getTip() {
    const data = await baseFetch("/tips")
    return data ?? [] // 데이터가 없으면 빈 배열 반환
  }
  
  
  // 팁 post
  export async function postTip(tip: PostTipsRequest): Promise<PostTipsResponse> {
    const data = await baseFetch<PostTipsResponse>("/tips", {
      method: "POST",
      data: tip,
    })
    return data ?? {} // 데이터가 없으면 빈 객체 반환
  }