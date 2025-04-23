'use client';

import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';

const formSchema = z.object({
  selectedCategories: z
    .array(z.string())
    .length(7, '카테고리를 7개 선택해주세요'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CategorySettings() {
  const {
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedCategories: [
        'food',
        'cafe_snack',
        'education',
        'shopping',
        'health',
        'living',
        'card_payment',
      ],
    },
    mode: 'onChange',
  });

  const selectedCategories = watch('selectedCategories');

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
  };

  useEffect(() => {
    trigger('selectedCategories');
  }, [selectedCategories, trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 w-full justify-center">
        {CATEGORIES.map((category) => {
          return (
            <Button
              key={category.id}
              type="button"
              variant="fit"
              size="fit"
              className={cn('', {
                'bg-primary text-white': selectedCategories.includes(
                  category.english
                ),
              })}
              onClick={() => handleCategoryClick(category.english)}
            >
              {category.korean}
            </Button>
          );
        })}
      </div>
      <Button variant="primary" disabled={!isValid}>
        저장하기
      </Button>
    </form>
  );
}
