'use client';

import { handleKakaoCallback } from '@/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import loading from '../../../../../public/lottie/piggy_loading.json';

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authorizationCode = searchParams.get('code');

    if (authorizationCode) {
      handleKakaoCallback({ authorizationCode })
        .then((data) => {
          // A. 로그인 성공 처리 (예: 토큰 저장, 홈으로 리다이렉트 등)
          localStorage.setItem('token', data.token);
          router.push('/');
        })
        .catch((error) => {
          // B. 에러 처리
          console.error('Login failed:', error);
          router.push('/login');
        });
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="body2">로그인 확인 중 ···</p>
      <Lottie animationData={loading} loop play />
    </div>
  );
};

export default KakaoCallbackPage;
