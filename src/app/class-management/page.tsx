'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AddClassDialog from './AddClassDialog';
import EditClassDialog from './EditClassDialog';

export default function ClassManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (cls: any) => {
    setSelectedClass(cls);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('确定要删除这个班级吗？')) {
      try {
        const response = await fetch(`/api/classes/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchClasses();
        }
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    }
  };

  const handleSaveEdit = (updatedClass: any) => {
    setClasses(classes.map(cls => 
      cls.id === updatedClass.id ? updatedClass : cls
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">班级管理</h1>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          添加班级
        </button>
      </div>
      
      <SearchBar />
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">序号</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级名称</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">教室</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开课时间</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结课时间</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班主任</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(classes) && classes.map((cls: any) => (
              <tr key={cls.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{cls.id}</td>
                <td className="px-6 py-4 border-b">{cls.class_name}</td>
                <td className="px-6 py-4 border-b">{cls.classroom}</td>
                <td className="px-6 py-4 border-b">{formatDate(cls.start_date)}</td>
                <td className="px-6 py-4 border-b">{formatDate(cls.end_date)}</td>
                <td className="px-6 py-4 border-b">{cls.head_teacher}</td>
                <td className="px-6 py-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(cls)}
                      className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(cls.id)}
                      className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
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

      <AddClassDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {selectedClass && (
        <EditClassDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedClass(null);
          }}
          classData={selectedClass}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
} 