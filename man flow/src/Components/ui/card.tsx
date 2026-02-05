// src/components/ui/card.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return <div className={`border rounded-md p-4 bg-white ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }: Props) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }: Props) {
  return <h3 className={`font-bold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
