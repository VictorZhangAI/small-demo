import db from '@/lib/db';

async function getClasses() {
  try {
    const [rows] = await db.query('SELECT * FROM classes ORDER BY id ASC');
    return rows;
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

export default async function ClassManagement() {
  const classes = await getClasses();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">班级管理</h1>
      
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 