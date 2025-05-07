'use client';

import { Suspense, useEffect } from 'react';
import FriendManagement from './friendManagement';

export default function FriendsContainer() {
  useEffect(() => {
    const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    const loadKakaoSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;

      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_APP_KEY);
        }
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    loadKakaoSDK();
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <Suspense fallback={<div>로딩 중...</div>}>
        <FriendManagement />
      </Suspense>
    </div>
  );
}
