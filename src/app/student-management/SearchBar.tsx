'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [studentId, setStudentId] = useState(searchParams.get('studentId') || '');
  const [name, setName] = useState(searchParams.get('name') || '');
  const [class_name, setClassName] = useState(searchParams.get('class') || '');
  const [educationLevel, setEducationLevel] = useState(searchParams.get('educationLevel') || '');

  useEffect(() => {
    setStudentId(searchParams.get('studentId') || '');
    setName(searchParams.get('name') || '');
    setClassName(searchParams.get('class') || '');
    setEducationLevel(searchParams.get('educationLevel') || '');
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (studentId) params.set('studentId', studentId);
    if (name) params.set('name', name);
    if (class_name) params.set('class', class_name);
    if (educationLevel) params.set('educationLevel', educationLevel);
    
    router.push(`/student-management?${params.toString()}`);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            学号
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入学号"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入姓名"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            班级
          </label>
          <input
            type="text"
            value={class_name}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入班级"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            最高学历
          </label>
          <select
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部</option>
            <option value="初中">初中</option>
            <option value="高中">高中</option>
            <option value="大专">大专</option>
            <option value="本科">本科</option>
            <option value="硕士">硕士</option>
            <option value="博士">博士</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            搜索
          </button>
        </div>
      </div>
    </div>
  );
} 