'use client';
import { PiggyBank, Upload } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function AccountInfo() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState<string>('');

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

  const handleSaveImage = () => {
    if (image) {
      // 이미지를 업로드 API
      console.log('이미지 저장:', image.name);

      alert('프로필 이미지가 변경되었습니다!');
    } else {
      alert('먼저 이미지를 선택해주세요!');
    }
  };

  const handleSaveNickname = () => {
    console.log('닉네임 저장:', nickname);
    // 닉네임 저장 API
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

        <button
          onClick={handleSaveImage}
          className="body3 w-full text-gray-500 cursor-pointer hover:text-black transition-colors"
        >
          프로필 이미지 변경
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <Label>닉네임</Label>
        <Input
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>카카오 계정</Label>
        <Input disabled value="growith@kakao.com" />
      </div>
      <Button variant="primary" onClick={handleSaveNickname}>
        저장하기
      </Button>
    </div>
  );
}
