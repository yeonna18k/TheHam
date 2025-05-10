'use client';

import { getUsersProfile, putUsersProfile } from '@/api/profileApi';
import { postUsersValidateNickname } from '@/api/userApi';
import { UsersProfileResponse } from '@/types/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader, PiggyBank, Upload } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useUsersProfile } from '@/hooks/useUsersProfile';

export default function AccountInfo() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profileData, isPending } = useQuery<UsersProfileResponse>({
    queryKey: ['userProfile'],
    queryFn: getUsersProfile,
  });

  const { updateProfile, isUpdating, validateNickname, isNicknameDuplicated } =
    useUsersProfile();

  const isNicknameChanged = profileData?.nickname === nickname;

  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || '');
      setEmail(profileData.email || '');

      if (profileData.profileImageUrl) {
        setPreviewUrl(profileData.profileImageUrl);
      }
    }
  }, [profileData]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleValidateNickname = () => {
    validateNickname({ nickname });
  };

  const handleUpdateProfile = () => {
    updateProfile({
      nickname,
      profileImageUrl: 'https://i.ibb.co/FbypYjgM/pokemon.png',
    });
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="프로필 미리보기"
              className="w-full h-full rounded-full object-cover"
              width={96}
              height={96}
            />
          ) : (
            <PiggyBank size={48} className="text-primary" />
          )}

          <button
            onClick={handleUploadClick}
            className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md hover:primary/80 transition-colors"
          >
            <Upload size={16} className="text-white" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>닉네임</Label>
        <div className="flex gap-2 relative">
          <Input
            placeholder={isPending ? 'Loading...' : '닉네임을 입력해주세요'}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={isPending}
          />
          <Button
            variant="fit"
            size="fitSm"
            onClick={handleValidateNickname}
            disabled={isNicknameChanged}
          >
            중복 확인
          </Button>
          {isNicknameDuplicated && (
            <span className="text-warning body3 absolute -bottom-4">
              중복된 닉네임입니다
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>카카오 계정</Label>
        <Input
          disabled
          className={isPending ? 'text-gray-500' : ''}
          value={isPending ? 'Loading...' : email}
        />
      </div>
      <Button variant="primary" onClick={handleUpdateProfile}>
        저장하기
        {isUpdating && <Loader className="animate-spin ml-2" size={20} />}
      </Button>
    </div>
  );
}
