// src/components/ui/button.tsx
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export function Button({ children, className, ...props }: Props) {
  return (
    <button className={`bg-blue-600 text-white rounded-md px-4 py-2 ${className}`} {...props}>
      {children}
    </button>
  );
}
