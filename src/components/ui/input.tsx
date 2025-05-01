import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

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

function PasswordInput({ className, ...props }: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
        {...props}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
      >
        {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
      </button>
    </div>
  );
}

export { Input, PasswordInput };
