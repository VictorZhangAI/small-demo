'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // 检查是否已登录
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      {/* 左栏导航 */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="space-y-4">
          <Link href="/class-management" className="block p-2 hover:bg-gray-700 rounded">
            班级管理
          </Link>
          <Link href="/student-management" className="block p-2 hover:bg-gray-700 rounded">
            学员管理
          </Link>
          <Link href="/department-management" className="block p-2 hover:bg-gray-700 rounded">
            部门管理
          </Link>
          <Link href="/staff-management" className="block p-2 hover:bg-gray-700 rounded">
            员工管理
          </Link>
          <Link href="/staff-statistics" className="block p-2 hover:bg-gray-700 rounded">
            员工信息统计
          </Link>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">欢迎使用管理系统</h1>
        <p className="text-gray-600">请从左侧菜单选择要管理的内容</p>
      </div>
    </div>
  );
} 