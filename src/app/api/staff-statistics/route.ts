import { mysql } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 获取性别统计数据
    const [genderStats] = await mysql.query(`
      SELECT gender, COUNT(*) as count 
      FROM staff 
      GROUP BY gender
    `);

    // 获取职位统计数据
    const [positionStats] = await mysql.query(`
      SELECT position, COUNT(*) as count 
      FROM staff 
      GROUP BY position
    `);

    return NextResponse.json({
      genderStats,
      positionStats
    });
  } catch (error) {
    console.error('获取员工统计数据失败:', error);
    return NextResponse.json({ error: '获取员工统计数据失败' }, { status: 500 });
  }
} 