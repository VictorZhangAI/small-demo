'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 检查是否已登录
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('请先登录后再访问此功能');
      router.push('/login');
      return;
    }
  };

  // 如果是登录或注册页面，不显示导航栏
  const isAuthPage = pathname === '/login' || pathname === '/register';
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* 顶栏 */}
      <div className="h-16 bg-white border-b flex items-center justify-end px-4">
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                修改密码
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                  router.push('/login');
                }}
                className="px-4 py-2 text-red-600 hover:text-red-800"
              >
                退出登录
              </button>
            </>
          ) : (
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              登录
            </button>
          )}
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-1">
        {/* 左栏导航 */}
        <div className="w-64 bg-gray-800 text-white p-4">
          <div className="space-y-4">
            <Link 
              href="/dashboard" 
              className="block p-2 hover:bg-gray-700 rounded"
              onClick={(e) => handleNavClick(e, '/dashboard')}
            >
              返回主页
            </Link>
            <Link 
              href="/class-management" 
              className="block p-2 hover:bg-gray-700 rounded"
              onClick={(e) => handleNavClick(e, '/class-management')}
            >
              班级管理
            </Link>
            <Link 
              href="/student-management" 
              className="block p-2 hover:bg-gray-700 rounded"
              onClick={(e) => handleNavClick(e, '/student-management')}
            >
              学员管理
            </Link>
            <Link 
              href="/department-management" 
              className="block p-2 hover:bg-gray-700 rounded"
              onClick={(e) => handleNavClick(e, '/department-management')}
            >
              部门管理
            </Link>
            <Link 
              href="/staff-management" 
              className="block p-2 hover:bg-gray-700 rounded"
              onClick={(e) => handleNavClick(e, '/staff-management')}
            >
              员工管理
            </Link>
            <Link 
              href="/staff-statistics" 
              className="block p-2 hover:bg-gray-700 rounded"
              onClick={(e) => handleNavClick(e, '/staff-statistics')}
            >
              员工信息统计
            </Link>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
} 