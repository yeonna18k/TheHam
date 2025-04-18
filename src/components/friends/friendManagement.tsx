import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface Friend {
  id: string;
  name: string;
  challengeCount: number;
  profileImage?: string;
}

const FriendManagement: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const storedFriends = localStorage.getItem('friends');
        if (storedFriends) {
          setFriends(JSON.parse(storedFriends));
        } else {
          const initialFriends: Friend[] = [
            { id: '1', name: '강나연', challengeCount: 2, profileImage: '/icons/test.jpg' },
            { id: '2', name: '김철수', challengeCount: 2, profileImage: '/icons/test.jpg' },
            { id: '3', name: '신혜서', challengeCount: 2, profileImage: '/icons/test.jpg' },
          ];
          setFriends(initialFriends);
          localStorage.setItem('friends', JSON.stringify(initialFriends));
        }
      } catch (error) {
        console.error('Failed to load friends:', error);
      }
    };

    loadFriends();
  }, []);

  const addFriendToChallenge = (friendId: string) => {
    console.log(`Adding friend ${friendId} to challenge`);
    alert(`친구가 챌린지에 추가되었습니다.`);
  };

  const sendKakaoInvite = async () => {
    try {
      if (!window.Kakao) {
        alert('카카오톡 SDK가 로드되지 않았습니다.');
        return;
      }

      window.Kakao.Link.sendDefault({
        objectType: 'text',
        text: '함께 챌린지에 참여해보세요!',
        link: {
            mobileWebUrl: `${window.location.origin}/goals`,
            webUrl:       `${window.location.origin}/goals`,
        },
        buttonTitle: '하러가기',
      });
    } catch (error) {
      console.error('Failed to send Kakao invite:', error);
      alert('카카오톡 초대장 전송에 실패했습니다.');
    }
  };

  interface KakaoResponse {
    id: string;
    properties: {
      nickname: string;
      profile_image?: string;
    };
  }

  const handleKakaoResponse = (response: KakaoResponse) => {
    if (response && response.id) {
      const newFriend: Friend = {
        id: response.id,
        name: response.properties.nickname || '새 친구',
        challengeCount: 0,
        profileImage: response.properties.profile_image || '/icons/test.jpg',
      };
      
      const updatedFriends = [...friends, newFriend];
      setFriends(updatedFriends);
      localStorage.setItem('friends', JSON.stringify(updatedFriends));
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    const kakaoUser = searchParams.get('kakao_user');
    if (kakaoUser) {
      try {
        const userData = JSON.parse(decodeURIComponent(kakaoUser));
        handleKakaoResponse(userData);
        
        router.replace('/friends');
      } catch (e) {
        console.error('Failed to parse Kakao user data', e);
      }
    }
  }, [router, searchParams]);

  return (
    <div className="px-4 py-6 bg-white min-h-screen">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="mr-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center">친구</h1>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="친구의 ID를 검색해세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-10 border rounded-lg"
        />
        <svg className="absolute left-3 top-3.5" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.7499 15.7499L12.4874 12.4874" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="text-lg font-bold mb-4">내 친구</h2>

      <div className="space-y-4">
        {friends
          .filter(friend => friend.name.includes(searchQuery))
          .map(friend => (
            <div key={friend.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full overflow-hidden mr-3">
                  {friend.profileImage ? (
                    <Image src={friend.profileImage} alt={friend.name} width={40} height={40} />
                  ) : (
                    <div className="w-full h-full bg-green-200 flex items-center justify-center">
                      <span className="text-green-600">{friend.name[0]}</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{friend.name}</div>
                  <div className="text-sm text-gray-500">{friend.challengeCount}개의 챌린지 참여중</div>
                </div>
              </div>
              <button 
                onClick={() => addFriendToChallenge(friend.id)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2.91675V11.0834" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.91675 7H11.0834" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
      </div>

      <button 
        onClick={sendKakaoInvite}
        className="fixed bottom-25 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black font-medium py-3 px-8 rounded-lg shadow-md flex items-center"
      >
        <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2.5C5.3075 2.5 1.5 5.52 1.5 9.205C1.5 11.5975 3.03 13.7 5.3825 14.89C5.199 15.4725 4.5465 17.2275 4.4315 17.5625C4.2915 17.975 4.591 17.9675 4.7985 17.8475C4.9585 17.7525 7.2035 16.265 8.1785 15.6425C8.769 15.7325 9.379 15.785 10 15.785C14.6925 15.785 18.5 12.765 18.5 9.08C18.5 5.395 14.6925 2.5 10 2.5Z" fill="black"/>
        </svg>
        친구 추가하기
      </button>
    </div>
  );
};

export default FriendManagement;