'use client';

import { useState, useEffect } from 'react';
import AddStaffDialog from './AddStaffDialog';
import EditStaffDialog from './EditStaffDialog';
import DeleteStaffDialog from './DeleteStaffDialog';

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await fetch('/api/staff');
      if (!response.ok) throw new Error('获取员工列表失败');
      const data = await response.json();
      setStaffList(data);
    } catch (err) {
      setError('获取员工列表失败，请重试');
      console.error('获取员工列表失败:', err);
    }
  };

  const handleAddStaff = async (newStaff: any) => {
    await fetchStaffList();
  };

  const handleEditStaff = async (updatedStaff: any) => {
    await fetchStaffList();
  };

  const handleDeleteStaff = async () => {
    if (!selectedStaff) return;
    try {
      const response = await fetch(`/api/staff/${selectedStaff.username}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('删除员工失败');
      await fetchStaffList();
    } catch (err) {
      setError('删除员工失败，请重试');
      console.error('删除员工失败:', err);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '无';
    try {
      return new Date(dateString).toLocaleString('zh-CN');
    } catch (err) {
      return '无效日期';
    }
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">员工管理</h1>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          添加员工
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">照片</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">性别</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">职位</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">入职日期</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后更新时间</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staffList.map((staff) => (
              <tr key={staff.username} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.full_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {staff.photo ? (
                    <img 
                      src={`data:image/jpeg;base64,${staff.photo.toString('base64')}`} 
                      alt={staff.full_name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">无</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(staff.hire_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(staff.last_updated)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedStaff(staff);
                        setIsEditDialogOpen(true);
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStaff(staff);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStaffDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddStaff}
      />

      <EditStaffDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEdit={handleEditStaff}
        staff={selectedStaff}
      />

      <DeleteStaffDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteStaff}
        staff={selectedStaff}
      />
    </div>
  );
} 