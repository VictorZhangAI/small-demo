import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { class_name, classroom, start_date, end_date, head_teacher } = body;

    const [result] = await db.query(
      'UPDATE classes SET class_name = ?, classroom = ?, start_date = ?, end_date = ?, head_teacher = ? WHERE id = ?',
      [class_name, classroom, start_date, end_date, head_teacher, id]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating class:', error);
    return NextResponse.json(
      { success: false, error: '更新班级失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const [result] = await db.query('DELETE FROM classes WHERE id = ?', [id]);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting class:', error);
    return NextResponse.json(
      { success: false, error: '删除班级失败' },
      { status: 500 }
    );
  }
} 