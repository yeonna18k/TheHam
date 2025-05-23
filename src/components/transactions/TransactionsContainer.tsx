'use client';

import {
  postAccountBookIncome,
  postAccountBookSpend,
  putAccountBookSpend,
} from '@/api/transactionsApi';
import { CATEGORIES, getCategoryByKorean } from '@/constants/categories';
import { PERIOD_TYPES } from '@/constants/period';
import { TransactionType } from '@/types/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const frequencyEnum = z.enum(
  PERIOD_TYPES.map((period) => period.en) as [string, ...string[]]
);
const categoryEnum = z.enum(
  CATEGORIES.map((category) => category.english) as [string, ...string[]]
);

const expenseFormSchema = z.object({
  id: z.number().optional(),
  amount: z
    .number({
      required_error: '금액을 입력해주세요',
    })
    .positive('금액은 0보다 커야 합니다'),
  category: categoryEnum,
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(100, '제목은 10자 이내로 입력해주세요'),
  memo: z
    .string()
    .max(30, '메모는 30자 이내로 입력해주세요')
    .optional()
    .nullable(),
  occurredAt: z.string().min(1, '날짜를 선택해주세요'),
  repeat: z
    .object({
      frequency: frequencyEnum.optional().nullable(),
      month: z.number().min(1).max(12).optional().nullable(),
      day: z.number().min(1).max(31).optional().nullable(),
    })
    .optional()
    .nullable(),
});

const defaultFormValue = {
  amount: 0,
  category: 'none',
  title: '',
  memo: '',
  occurredAt: format(new Date(), 'yyyy-MM-dd'),
  repeat: {
    frequency: null,
    month: null,
    day: null,
  },
};

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

export default function TransactionsContainer({
  transaction,
  defaultValue = defaultFormValue,
  isEdit,
}: {
  transaction: TransactionType;
  defaultValue?: ExpenseFormValues;
  isEdit?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fixedDate, setFixedDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [fixedExpenditure, setFixedExpenditure] = useState(false);
  const [openFixedDateCalendar, setOpenFixedDateCalendar] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, setValue, watch, handleSubmit } =
    useForm<ExpenseFormValues>({
      resolver: zodResolver(expenseFormSchema),
      defaultValues: defaultValue,
    });

  const focusedCategory = watch('category');
  // const amountValue = watch('amount');
  // const formattedAmount = amountValue
  //   ? amountValue.toLocaleString('ko-KR')
  //   : '';

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setValue('occurredAt', format(selectedDate, 'yyyy-MM-dd'));
    }
    setOpenCalendar(false);
  };

  const spendMutation = useMutation({
    mutationFn: postAccountBookSpend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountBook'] });
      router.push('/transactions/tabs');
    },
    onError: (error) => {
      console.error('지출 등록 실패:', error);
    },
  });

  const spendEditMutation = useMutation({
    mutationFn: putAccountBookSpend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountBook'] });
      router.push('/transactions/tabs');
    },
    onError: (error) => {
      console.error('지출 수정 실패:', error);
    },
  });

  const incomeMutation = useMutation({
    mutationFn: postAccountBookIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountBook'] });
      router.push('/transactions/tabs');
    },
    onError: (error) => {
      console.error('수입 등록 실패:', error);
    },
  });

  const incomeEditMutation = useMutation({
    mutationFn: putAccountBookSpend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountBook'] });
      router.push('/transactions/tabs');
    },
    onError: (error) => {
      console.error('수입 수정 실패:', error);
    },
  });

  const onSubmit = (data: ExpenseFormValues) => {
    const transactionData = {
      title: data.title,
      amount: data.amount,
      memo: data.memo || '',
      occurredAt: data.occurredAt,
      category: data.category,
      ...(fixedExpenditure
        ? {
            endDate: fixedDate?.to
              ? format(fixedDate.to, 'yyyy-MM-dd')
              : undefined,
            repeat: {
              frequency: data.repeat?.frequency,
              month: data.repeat?.month,
              day: data.repeat?.day,
            },
          }
        : {}),
    };

    if (transaction === 'SPEND') {
      if (isEdit && data.id) {
        spendEditMutation.mutate({ id: data.id, ...transactionData });
      } else spendMutation.mutate(transactionData);
    }

    if (transaction === 'INCOME') {
      if (isEdit && data.id) {
        incomeEditMutation.mutate({
          id: data.id,
          ...transactionData,
        });
      } else {
        incomeMutation.mutate(transactionData);
      }
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(
        'category',
        getCategoryByKorean(defaultValue.category)?.english as string
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-3 py-6 flex flex-col gap-6 bg-white rounded-lg shadow-sm"
    >
      <div className="relative flex gap-3">
        <Label className="shrink-0">금액</Label>
        <span className="absolute right-3 top-3 body2 text-gray-500">원</span>
        <Input
          {...register('amount', { valueAsNumber: true })}
          maxLength={20}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label>카테고리 선택</Label>
        {transaction === 'SPEND' ? (
          <div className="grid grid-cols-2 w-full gap-2">
            {(showAll ? CATEGORIES.slice(0, 20) : CATEGORIES.slice(0, 7)).map(
              (category) => (
                <Button
                  type="button"
                  variant="icon"
                  key={category.id}
                  onClick={() => setValue('category', category.english)}
                  className={
                    focusedCategory === category.english
                      ? 'bg-primary text-white'
                      : ''
                  }
                >
                  {category.korean}
                </Button>
              )
            )}
            {!showAll && (
              <Button
                variant="icon"
                onClick={() => setShowAll(true)}
                type="button"
              >
                더보기
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.slice(17, 20).map((category) => (
              <Button
                type="button"
                variant="icon"
                key={category.id}
                className={
                  focusedCategory === category.english
                    ? 'bg-primary  text-white'
                    : ''
                }
                onClick={() => setValue('category', category.english)}
              >
                {category.korean}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>제목</Label>
        <Input
          placeholder="제목을 입력해주세요(10자 이내)"
          maxLength={10}
          {...register('title')}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>메모</Label>
        <Input
          placeholder="메모를 입력해주세요(30자 이내)"
          maxLength={30}
          {...register('memo')}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>날짜</Label>
        <div className="relative">
          <Button
            id="date"
            variant="outline"
            type="button"
            onClick={() => setOpenCalendar(!openCalendar)}
            className="justify-start pl-3 focus:bg-transparent"
          >
            <CalendarIcon className="text-gray-500" />
            {date && format(date, 'yyyy. MM. dd')}
          </Button>
          {openCalendar && (
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="absolute bg-white -top-73 left-10  rounded-md shadow-sm z-10"
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={fixedExpenditure}
          onCheckedChange={() => setFixedExpenditure(!fixedExpenditure)}
        />
        <Label>고정 지출로 등록</Label>
      </div>
      {fixedExpenditure && (
        <div>
          <Label className="shrink-0 mb-4">기간</Label>
          <div className="grid grid-cols-4 gap-2">
            {PERIOD_TYPES.map((period) => (
              <Button key={period.key}>{period.ko}</Button>
            ))}
          </div>
          <div className="relative flex items-center gap-2 mt-4">
            <Button
              type="button"
              id="fixed-date"
              variant="outline"
              onClick={() => setOpenFixedDateCalendar(!openFixedDateCalendar)}
              className="justify-start pl-3 focus:bg-transparent"
            >
              <CalendarIcon className="text-gray-500" />
              {fixedDate?.from ? (
                fixedDate.to ? (
                  <>
                    {format(fixedDate.from, 'yyyy. MM. dd')} -{' '}
                    {format(fixedDate.to, 'yyyy. MM. dd')}
                  </>
                ) : (
                  format(fixedDate.from, 'yyyy. MM. dd')
                )
              ) : (
                <span>기간을 설정해주세요</span>
              )}
            </Button>
            {openFixedDateCalendar && (
              <Calendar
                mode="range"
                selected={fixedDate}
                defaultMonth={fixedDate?.from}
                onSelect={setFixedDate}
                className="absolute bg-white -top-73 left-10  rounded-md shadow-sm z-10"
              />
            )}
          </div>
        </div>
      )}
      <Button variant="primary" type="submit">
        {isEdit ? '수정하기' : '등록하기'}
      </Button>
    </form>
  );
}
