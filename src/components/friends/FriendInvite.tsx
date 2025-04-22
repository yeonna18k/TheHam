import { useState } from 'react';

  interface Friend {
    id: string;
    name: string;
    email: string;
    invited?: boolean;
  }
  
  export default function FriendInvite() {
    const [friends, setFriends] = useState<Friend[]>([
      { id: '1', name: '강나연', email: '1234@gmail.com', invited: false },
      { id: '2', name: '강나연', email: '1234@gmail.com', invited: false },
      { id: '3', name: '강나연', email: '1234@gmail.com', invited: true },
    ]);
  
    const [challengeType, setChallengeType] = useState<string>('30일 절약 챌린지');
  
    const handleInvite = (friendId: string) => {
      setFriends(friends.map(friend => 
        friend.id === friendId ? { ...friend, invited: !friend.invited } : friend
      ));
    };
  
    return (
      <div>
        <div className="mb-6">
          <h2 className="font-bold mt-4">챌린지 초대</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-medium mb-2">챌린지 선택</p>
            <div className="relative">
              <select
                value={challengeType}
                onChange={(e) => setChallengeType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none"
              >
                <option value="30일 절약 챌린지">30일 절약 챌린지</option>
                <option value="매일 운동 챌린지">매일 운동 챌린지</option>
                <option value="책 읽기 챌린지">책 읽기 챌린지</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mb-6">
          <h2 className="font-medium mb-4">초대할 친구</h2>
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-500">{friend.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{friend.name}</p>
                  <p className="text-sm text-gray-500">{friend.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleInvite(friend.id)}
                className={`px-4 py-1 rounded-md ${
                  friend.invited 
                    ? 'bg-gray-300 text-gray-700' 
                    : 'bg-green-500 text-white'
                }`}
              >
                {friend.invited ? '초대됨' : '초대'}
              </button>
            </div>
          ))}
        </div>
  
        <div className="mb-6">
          <h2 className="font-bold mb-4">챌린지 요청</h2>
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-500">이</span>
              </div>
              <div>
                <p className="font-medium">이지원</p>
                <p className="text-sm text-gray-500">1234@gmail.com</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-3 rounded-md mb-3">
              <p className="font-medium mb-1">30일 절약 챌린지</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <p>우리는 거지다 우가우가</p>
                <p>2025.04.20~2025.05.20</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-green-500 text-white rounded-md">수락</button>
              <button className="flex-1 py-2 border border-red-500 text-red-500 rounded-md">거절</button>
            </div>
          </div>
        </div>
      </div>
    );
  }