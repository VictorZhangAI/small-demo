'use client';

import { useState, useEffect } from 'react';

interface Department {
  id: number;
  name: string;
}

interface Staff {
  username: string;
  full_name: string;
  gender: string;
  position: string;
  hire_date: string;
  department: string;
  photo: Buffer | null;
}

interface EditStaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (staff: any) => void;
  staff: Staff | null;
}

export default function EditStaffDialog({ isOpen, onClose, onEdit, staff }: EditStaffDialogProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    gender: '',
    position: '',
    hire_date: '',
    department: '',
    photo: null as File | null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
    }
    if (staff) {
      setFormData({
        username: staff.username || '',
        full_name: staff.full_name || '',
        gender: staff.gender || '',
        position: staff.position || '',
        hire_date: staff.hire_date || '',
        department: staff.department || '',
        photo: null,
      });
    }
  }, [isOpen, staff]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      if (!response.ok) throw new Error('获取部门列表失败');
      const data = await response.json();
      console.log('获取到的部门数据:', data);
      setDepartments(data);
    } catch (err) {
      console.error('获取部门列表失败:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 验证必填字段
    if (!formData.username || !formData.full_name || !formData.hire_date || !formData.department) {
      setError('请填写所有必填字段');
      return;
    }

    // 验证照片
    if (formData.photo) {
      if (formData.photo.size > 2 * 1024 * 1024 * 1024) {
        setError('照片大小不能超过2GB');
        return;
      }
      const fileType = formData.photo.type;
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(fileType)) {
        setError('照片格式必须是jpg、jpeg或png');
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch(`/api/staff/${staff?.username}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '更新员工信息失败');
      }

      onEdit(await response.json());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新员工信息失败，请重试');
      console.error('更新员工信息失败:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">编辑员工信息</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">用户名</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">员工姓名</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">性别</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">请选择</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">职位</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">入职日期</label>
            <input
              type="date"
              value={formData.hire_date}
              onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">归属部门</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">请选择部门</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">照片</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 