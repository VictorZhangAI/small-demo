import { NextResponse } from 'next/server';
import { mysql } from '@/lib/mysql';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const studentId = params.id;
    const { name, class: class_name, gender, phone, education_level } = data;

    const [result] = await mysql.query(
      'UPDATE students SET name = ?, class = ?, gender = ?, phone = ?, education_level = ? WHERE student_id = ?',
      [name, class_name, gender, phone, education_level, studentId]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;
    
    const [result] = await mysql.query(
      'DELETE FROM students WHERE student_id = ?',
      [studentId]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
} 