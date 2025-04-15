import { getStaffList } from '@/lib/db';

export default async function StaffManagement() {
  const staffList = await getStaffList();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">员工管理</h1>
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
                  {new Date(staff.hire_date).toLocaleDateString('zh-CN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(staff.last_updated).toLocaleString('zh-CN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 