import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* 左栏 */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="space-y-4">
          <Link href="/class-management" className="block p-2 hover:bg-gray-700 rounded">
            班级管理
          </Link>
          <Link href="/student-management" className="block p-2 hover:bg-gray-700 rounded">
            学员管理
          </Link>
          <Link href="/department-management" className="block p-2 hover:bg-gray-700 rounded">
            部门管理
          </Link>
          <Link href="/staff-management" className="block p-2 hover:bg-gray-700 rounded">
            员工管理
          </Link>
          <Link href="/staff-statistics" className="block p-2 hover:bg-gray-700 rounded">
            员工信息统计
          </Link>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 p-4">
        {/* 这里放置主页特有的内容 */}
      </div>
    </>
  );
}
