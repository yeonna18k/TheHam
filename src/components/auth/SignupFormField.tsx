'use client';

import { postAuthSignUp } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요'),
  selectedCategories: z
    .array(z.string())
    .length(7, '카테고리를 7개 선택해주세요'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupFormField() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
      selectedCategories: [],
    },
    mode: 'onChange',
  });

  const selectedCategories = watch('selectedCategories');

  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email');
  console.log(searchParams.get('email'));

  const handleCategoryClick = (addCategory: string) => {
    if (getValues('selectedCategories').includes(addCategory)) {
      setValue(
        'selectedCategories',
        selectedCategories.filter((category) => category !== addCategory)
      );
    } else {
      setValue(
        'selectedCategories',
        [...selectedCategories, addCategory].slice(0, 7)
      );
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    if (userEmail) {
      postAuthSignUp(userEmail, {
        nickname: data.nickname,
        categories: data.selectedCategories,
      });
    }
  };

  useEffect(() => {
    trigger('selectedCategories');
  }, [selectedCategories, trigger]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 justify-center"
    >
      <div className="flex flex-col gap-2 w-full">
        <Label>닉네임</Label>
        <div className="w-full flex gap-2 items-center">
          <Input id="nickname" {...register('nickname')} />
          <Button variant="fit" size="fitSm" type="button">
            중복 확인
          </Button>
        </div>
      </div>
      <span className="text-center text-sm text-gray-600">
        자주 사용하실 카테고리를 7가지 선택해주세요
        <br />
        선택하신 카테고리는 지출 등록 시 상위에 나타나요
      </span>
      <div className="flex flex-wrap gap-2 w-full justify-center">
        {CATEGORIES.slice(0, 17).map((category) => {
          return (
            <Button
              key={category.id}
              type="button"
              variant="fit"
              size="fit"
              className={cn('', {
                'bg-primary text-white': getValues(
                  'selectedCategories'
                ).includes(category.english),
              })}
              onClick={() => handleCategoryClick(category.english)}
            >
              {category.korean}
            </Button>
          );
        })}
      </div>
      <Button variant="primary" disabled={!isValid}>
        시작하기
      </Button>
    </form>
  );
}
