'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ChangePasswordDialog from './ChangePasswordDialog';

export default function Navigation({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 检查登录状态的函数
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    console.log('Navigation - Stored username:', storedUsername);
    setIsLoggedIn(!!token);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  useEffect(() => {
    // 初始检查登录状态
    checkLoginStatus();

    // 添加storage事件监听器
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'username') {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 清理函数
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 添加自定义事件监听器
  useEffect(() => {
    const handleLoginStateChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('loginStateChange', handleLoginStateChange);

    return () => {
      window.removeEventListener('loginStateChange', handleLoginStateChange);
    };
  }, []);

  useEffect(() => {
    console.log('Navigation - Current username state:', username);
  }, [username]);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('请先登录后再访问此功能');
      router.push('/login');
      return;
    }
  };

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setIsLoggedIn(false);
      router.push('/login');
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
      <div className="h-16 bg-white border-b flex items-center justify-between px-4">
        {isLoggedIn && (
          <div className="text-gray-600">
            欢迎，{username}
          </div>
        )}
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <button 
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  console.log('Opening change password dialog with username:', username);
                  setIsChangePasswordOpen(true);
                }}
              >
                修改密码
              </button>
              <button 
                onClick={handleLogout}
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

      {/* 修改密码对话框 */}
      <ChangePasswordDialog
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        username={username}
      />
    </div>
  );
} 