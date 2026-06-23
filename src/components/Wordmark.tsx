interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Wordmark({ className = '', size = 'md' }: WordmarkProps) {
  const sizes = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-14',
  };

  return (
    <img
      src="/dp64e-removebg-preview.png"
      alt="p42ern.ai"
      className={`${sizes[size]} w-auto ${className}`}
    />
  );
}
