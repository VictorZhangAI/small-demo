import { NextResponse } from 'next/server';
import { mysql } from '@/lib/mysql';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { points } = await request.json();
    const studentId = params.id;

    // 更新学生的违纪记录
    const [result] = await mysql.query(
      'UPDATE students SET violation_count = violation_count + 1, violation_points = violation_points + ? WHERE student_id = ?',
      [points, studentId]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating violation:', error);
    return NextResponse.json({ error: 'Failed to update violation' }, { status: 500 });
  }
} 