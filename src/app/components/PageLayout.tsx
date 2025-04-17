'use client';

import Link from 'next/link';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* 内容区域 */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
} 