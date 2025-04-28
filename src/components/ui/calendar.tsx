'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ko } from 'react-day-picker/locale';

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  transactions?: {
    [date: string]: {
      income: number;
      expense: number;
    };
  };
  formatCurrency?: (amount: number) => string;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  transactions,
  formatCurrency = (amount) => `${amount.toLocaleString()}`,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        button_previous: 'absolute left-1',
        button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100'
        ),
        range_start:
          'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground rounded-l-sm',
        range_end:
          'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground rounded-r-sm',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ className, ...props }) => {
          if (props.orientation === 'left') {
            return (
              <ChevronLeft className={cn('size-4', className)} {...props} />
            );
          } else {
            return (
              <ChevronRight className={cn('size-4', className)} {...props} />
            );
          }
        },
        // Day: ({ day, modifiers, ...props }) => {
        //   const dateKey = day.date.toISOString().split('T')[0];
        //   const dayTransactions = transactions?.[dateKey];

        //   return (
        //     <div {...props}>
        //       <div className="flex flex-col items-center w-full h-full">
        //         <span className="text-sm">{day.date.getDate()}</span>
        //         {dayTransactions && (
        //           <div className="flex flex-col text-xs gap-px">
        //             {dayTransactions.income > 0 && (
        //               <span className="text-green-500">
        //                 +{formatCurrency(dayTransactions.income)}
        //               </span>
        //             )}
        //             {dayTransactions.expense > 0 && (
        //               <span className="text-red-500">
        //                 -{formatCurrency(dayTransactions.expense)}
        //               </span>
        //             )}
        //           </div>
        //         )}
        //       </div>
        //     </div>
        //   );
        // },
      }}
      {...props}
    />
  );
}

export { Calendar };
