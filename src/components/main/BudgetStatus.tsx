"use client"
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';  // jwt-decode 라이브러리 사용
import { BudgetTip } from './BudgetTip';
import { useGetBudget } from '@/hooks/useBudget';
import Cookies from 'js-cookie';  // js-cookie 라이브러리 사용

interface JwtPayload {
  userId: number;
  // JWT의 페이로드에서 필요한 다른 필드들
}

export const BudgetStatus: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }); 

  useEffect(() => {

    // 쿠키에 access_token 저장하기
    Cookies.set('access_token', 'your-access-token', { domain: '.kro.kr', path: '/' });

    // 쿠키에서 access_token 읽기
    const accessToken = Cookies.get('access_token');
    console.log(`액세스토큰: ${accessToken}`);  // access_token이 있는 경우 출력


    if (accessToken) {
      try {
        // JWT 토큰을 디코딩하여 userId를 추출
        const decodedToken: JwtPayload = jwtDecode(accessToken);
        setUserId(decodedToken.userId);  // userId를 상태에 저장
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
      }
    }
  }, []);

  const { data, isLoading, isError } = useGetBudget(userId);  // 예산 API 호출
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [usedBudget, setUsedBudget] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setTotalBudget(data.budget);
      setUsedBudget(data.total);
    }
  }, [data]);

  // userId가 없다면 로딩 중이거나 로그인 상태가 아니라는 메시지를 표시
  if (!userId) {
    return <p>로그인 정보를 확인할 수 없습니다. 로그인해주세요.</p>;
  }

  const percentage = Math.round((usedBudget / totalBudget) * 100);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 가져오는 데 오류가 발생했습니다.</p>;

  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-bold">{currentMonth} 소비 현황</h2>
      <p className="text-gray-500 text-sm my-1">
        {currentMonth} 목표 예산 {totalBudget.toLocaleString()}원 중 {usedBudget.toLocaleString()}원을 사용했어요
      </p>
      <div className="mt-2 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-400 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right text-green-500 mt-1">{percentage}%</div>

      <BudgetTip />
    </div>
  );
};
