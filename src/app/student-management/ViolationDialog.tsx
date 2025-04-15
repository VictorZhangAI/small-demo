'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ViolationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
}

export default function ViolationDialog({ isOpen, onClose, student }: ViolationDialogProps) {
  const router = useRouter();
  const [points, setPoints] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/students/${student.student_id}/violation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: parseInt(points) }),
      });

      if (response.ok) {
        router.refresh();
        onClose();
        setPoints('');
      }
    } catch (error) {
      console.error('Error adding violation:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">添加违纪记录</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学员信息
              </label>
              <div className="p-2 bg-gray-50 rounded">
                <p>学号：{student.student_id}</p>
                <p>姓名：{student.name}</p>
                <p>当前违纪次数：{student.violation_count}</p>
                <p>当前违纪扣分：{student.violation_points}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                本次违纪扣分
              </label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="1"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 