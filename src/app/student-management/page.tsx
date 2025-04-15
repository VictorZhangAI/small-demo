'use client';

import { useState, useEffect } from 'react';
import AddStudentDialog from './AddStudentDialog';
import ViolationDialog from './ViolationDialog';

export default function StudentManagement() {
  const [students, setStudents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViolationDialogOpen, setIsViolationDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 计算当前页显示的数据
  const paginatedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(students.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleViolation = (student: any) => {
    setSelectedStudent(student);
    setIsViolationDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">学员管理</h1>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          添加学员
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学号</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">性别</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">手机号</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最高学历</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">违纪次数</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">违纪扣分</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后操作时间</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student) => (
              <tr key={student.student_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{student.student_id}</td>
                <td className="px-6 py-4 border-b">{student.name}</td>
                <td className="px-6 py-4 border-b">{student.class}</td>
                <td className="px-6 py-4 border-b">{student.gender}</td>
                <td className="px-6 py-4 border-b">{student.phone}</td>
                <td className="px-6 py-4 border-b">{student.education_level}</td>
                <td className="px-6 py-4 border-b">{student.violation_count}</td>
                <td className="px-6 py-4 border-b">{student.violation_points}</td>
                <td className="px-6 py-4 border-b">{formatDate(student.last_operation_time)}</td>
                <td className="px-6 py-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleViolation(student)}
                      className="px-2 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                    >
                      违纪
                    </button>
                    <button
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

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">每页显示：</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm text-gray-600">条</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            上一页
          </button>
          <span className="text-sm text-gray-600">
            第 {currentPage} 页 / 共 {totalPages} 页
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            下一页
          </button>
        </div>
      </div>

      <AddStudentDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {selectedStudent && (
        <ViolationDialog
          isOpen={isViolationDialogOpen}
          onClose={() => {
            setIsViolationDialogOpen(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
        />
      )}
    </div>
  );
}