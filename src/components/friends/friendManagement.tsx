
"use client";
import { Plus, SearchIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { 
  useSharedKakao, 
  useFriendsInviteToken, 
  useFriendsDelete, 
  useFriendsAccept, 
  useFriendsReject, 
  useFriendsList, 
  useFriendsRequestList 
} from '@/hooks/useFriends';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface Friend {
  id: string;
  name: string;
  challengeCount: number;
  profileImage?: string;
}

const FriendManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // React Query 훅 사용
  const { 
    data: friendsList, 
    isLoading: isLoadingFriends, 
    refetch: refetchFriends 
  } = useFriendsList();
  
  const { 
    data: requestList, 
    isLoading: isLoadingRequests, 
    refetch: refetchRequests 
  } = useFriendsRequestList();
  
  const { mutateAsync: deleteFriend } = useFriendsDelete();
  const { mutateAsync: acceptFriend } = useFriendsAccept();
  const { mutateAsync: rejectFriend } = useFriendsReject();
  const { mutateAsync: getInviteToken } = useFriendsInviteToken();
  const { mutateAsync: shareKakao } = useSharedKakao();

  // 카카오로 친구 초대하는 함수
  // 친구 초대 토큰 발급 함수 수정
  const sendKakaoInvite = async () => {
    try {
      // 쿠키에서 액세스 토큰을 읽어오기
      const getAccessTokenFromCookie = (): string | null => {
        const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
        return match ? match[2] : null;
      };
  
      // 액세스 토큰 가져오기
      const accessToken = getAccessTokenFromCookie();
      if (!accessToken) {
        throw new Error("Access token not found in cookies");
      }
  
      // 초대 토큰 생성
      const { token } = await getInviteToken({
        headers: { Authorization: `Bearer ${accessToken}` }
      }) as { token: string };
  
      const inviteUrl = `${window.location.origin}/invite?token=${token}`;
  
      // 카카오 공유하기
      await shareKakao(JSON.stringify({
        title: '함께 챌린지에 참여해보세요!',
        description: '함께 목표를 달성하고 습관을 만들어요',
        imageUrl: `${window.location.origin}/images/app-logo.png`,
        link: inviteUrl
      }));
  
      console.log("Kakao invite sent successfully!");
  
    } catch (error) {
      console.error('Failed to send Kakao invite:', error);
      if (error.response) {
        console.error('Response error:', error.response);
      }
    }
  };
  
  // 친구를 챌린지에 추가하는 함수
  const addFriendToChallenge = (friendId: string) => {
    console.log(`Adding friend ${friendId} to challenge`);
    router.push(`/challenge/create?friend=${friendId}`);
  };

  // 친구 요청 수락 함수
  const handleAcceptRequest = async (requestId: number) => {
    try {
      await acceptFriend(requestId);
      await refetchRequests();
      await refetchFriends();
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  // 친구 요청 거절 함수
  const handleRejectRequest = async (requestId: number) => {
    try {
      await rejectFriend(requestId);
      await refetchRequests();
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  };

  // 친구 삭제 함수
  const handleDeleteFriend = async (friendId: number) => {
    try {
      await deleteFriend(friendId);
      await refetchFriends();
    } catch (error) {
      console.error('Failed to delete friend:', error);
    }
  };

  // 카카오 로그인 콜백 처리
  useEffect(() => {
    const kakaoUser = searchParams.get('kakao_user');
    if (kakaoUser) {
      try {
        const userData = JSON.parse(decodeURIComponent(kakaoUser));
        router.replace('/friends');
        refetchFriends();
      } catch (e) {
        console.error('Failed to parse Kakao user data', e);
      }
    }
  }, [router, searchParams, refetchFriends]);

  // 로딩 상태 처리
  if (isLoadingFriends || isLoadingRequests) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 데이터 필터링
  const friends = friendsList || [];
  const friendRequests = requestList || [];
  
  const filteredFriends = friends.filter((friend) => 
    friend.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-20">
      <div className="relative mb-6 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="친구의 ID를 검색해세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-10 border rounded-lg"
        />
        <SearchIcon
          size={18}
          className="text-gray-500 absolute left-3 top-3.5"
        />
      </div>

      {/* 친구 요청 섹션 */}
      {friendRequests.length > 0 && (
        <div className="mb-6">
          <h2 className="title2 mb-4">친구 요청</h2>
          <div className="space-y-4">
            {friendRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden mr-3">
                    {request.profileImage ? (
                      <Image
                        src={request.profileImage}
                        alt={request.name}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                        <span className="text-blue-600">{request.name?.[0] || '?'}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-gray-500">새 친구 요청</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                  >
                    수락
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm"
                  >
                    거절
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 친구 목록 섹션 */}
      <h2 className="title2 mb-4">내 친구</h2>

      {filteredFriends.length > 0 ? (
        <div className="space-y-4">
          {filteredFriends.map((friend: { id: React.Key | null | undefined; profileImage: string | StaticImport; name: string | number | bigint | boolean | any[] | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; challengeCount: any; }) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full overflow-hidden mr-3">
                  {friend.profileImage ? (
                    <Image
                      src={friend.profileImage}
                      alt={friend.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-200 flex items-center justify-center">
                      <span className="text-green-600">{friend.name?.[0] || '?'}</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{friend.name}</div>
                  <div className="text-sm text-gray-500">
                    {friend.challengeCount || 0}개의 챌린지 참여중
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => addFriendToChallenge(friend.id)}
                  className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                >
                  <Plus size={14} className="text-green-700" />
                </button>
                <button
                  onClick={() => handleDeleteFriend(friend.id)}
                  className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <X size={14} className="text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3.46776C17.4817 4.20411 18.5 5.73314 18.5 7.5C18.5 9.26686 17.4817 10.7959 16 11.5322M18 14.5C19.933 14.5 21.5 16.067 21.5 18V19.5C21.5 19.7761 21.2761 20 21 20H3C2.72386 20 2.5 19.7761 2.5 19.5V18C2.5 16.067 4.067 14.5 6 14.5H18Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 7.5C15 9.433 13.433 11 11.5 11C9.567 11 8 9.433 8 7.5C8 5.567 9.567 4 11.5 4C13.433 4 15 5.567 15 7.5Z" stroke="#3B82F6" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            등록된 친구가 없어요
          </p>
          <p className="text-gray-500 mb-4">
            친구를 초대하고 함께 챌린지에 참여해보세요
          </p>
        </div>
      )}

      {/* 카카오 초대 버튼 */}
      <button
        onClick={sendKakaoInvite}
        className="title3 cursor-pointer fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-social-kakao text-black font-medium py-3 px-8 rounded-lg shadow-md flex items-center hover:shadow-lg transition-shadow"
      >
        <svg
          className="mr-2"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2.5C5.3075 2.5 1.5 5.52 1.5 9.205C1.5 11.5975 3.03 13.7 5.3825 14.89C5.199 15.4725 4.5465 17.2275 4.4315 17.5625C4.2915 17.975 4.591 17.9675 4.7985 17.8475C4.9585 17.7525 7.2035 16.265 8.1785 15.6425C8.769 15.7325 9.379 15.785 10 15.785C14.6925 15.785 18.5 12.765 18.5 9.08C18.5 5.395 14.6925 2.5 10 2.5Z"
            fill="black"
          />
        </svg>
        친구 초대하기
      </button>
    </div>
  );
};

export default FriendManagement;