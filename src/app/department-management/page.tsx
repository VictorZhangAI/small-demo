'use client';

import { useEffect, useState } from 'react';

interface Department {
  id: number;
  name: string;
  last_operation_time: string;
}

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      if (!response.ok) {
        throw new Error('获取部门数据失败');
      }
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      setError('加载部门数据时出错');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.trim()) return;
    
    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newDepartment }),
      });

      if (!response.ok) {
        throw new Error('添加部门失败');
      }

      setNewDepartment('');
      setShowModal(false);
      fetchDepartments();
    } catch (err) {
      setError('添加部门时出错');
      console.error(err);
    }
  };

  const handleEditDepartment = async () => {
    if (!editingDepartment?.name.trim()) return;
    
    try {
      const response = await fetch('/api/departments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingDepartment.id,
          name: editingDepartment.name,
        }),
      });

      if (!response.ok) {
        throw new Error('更新部门失败');
      }

      setEditingDepartment(null);
      fetchDepartments();
    } catch (err) {
      setError('更新部门时出错');
      console.error(err);
    }
  };

  const handleDeleteDepartment = async (id: number) => {
    try {
      const response = await fetch('/api/departments', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('删除部门失败');
      }

      setShowDeleteConfirm(null);
      fetchDepartments();
    } catch (err) {
      setError('删除部门时出错');
      console.error(err);
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">部门管理</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          添加部门
        </button>
      </div>

      {/* 添加部门弹窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">添加新部门</h2>
            <input
              type="text"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="请输入部门名称"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={handleAddDepartment}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑部门弹窗 */}
      {editingDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">编辑部门</h2>
            <input
              type="text"
              value={editingDepartment.name}
              onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
              placeholder="请输入部门名称"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingDepartment(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={handleEditDepartment}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认弹窗 */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">确认删除</h2>
            <p className="mb-4">确定要删除这个部门吗？此操作不可撤销。</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={() => handleDeleteDepartment(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                确定删除
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">序号</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门名称</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后操作时间</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{dept.id}</td>
                <td className="px-6 py-4 border-b">{dept.name}</td>
                <td className="px-6 py-4 border-b">{new Date(dept.last_operation_time).toLocaleString()}</td>
                <td className="px-6 py-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingDepartment(dept)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(dept.id)}
                      className="text-red-500 hover:text-red-700"
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
    </div>
  );
} 