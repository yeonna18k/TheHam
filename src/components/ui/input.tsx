import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'body2 placeholder:gray-500 selection:bg-primary selection:text-primary-foreground border-gray-300 flex h-fit w-full min-w-0 rounded-md border bg-white p-3 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-200',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };
