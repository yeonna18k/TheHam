'use client'
import { useEffect } from 'react';
import Head from 'next/head';
import FriendManagement from '../../components/friends/friendManagement';

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

const FriendsPage: React.FC = () => {
  useEffect(() => {
    const loadKakaoSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_APP_KEY);
          console.log('Kakao SDK initialized');
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
    <>
      <Head>
        <title>친구 관리</title>
        <meta name="description" content="친구 관리 및 챌린지 초대" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <FriendManagement />
    </>
  );
};

export default FriendsPage;