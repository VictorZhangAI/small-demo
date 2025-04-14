'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [className, setClassName] = useState(searchParams.get('className') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

  useEffect(() => {
    setClassName(searchParams.get('className') || '');
    setStartDate(searchParams.get('startDate') || '');
    setEndDate(searchParams.get('endDate') || '');
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (className) params.set('className', className);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    
    router.push(`/class-management?${params.toString()}`);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            班级名称
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入班级名称"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            开课时间
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            结课时间
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
