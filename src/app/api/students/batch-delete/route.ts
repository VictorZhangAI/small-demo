import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request: Request) {
  try {
    const { studentIds } = await request.json();
    
    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json({ error: 'Invalid student IDs' }, { status: 400 });
    }

    const placeholders = studentIds.map(() => '?').join(',');
    const [result] = await db.query(
      `DELETE FROM students WHERE student_id IN (${placeholders})`,
      studentIds
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error batch deleting students:', error);
    return NextResponse.json({ error: 'Failed to batch delete students' }, { status: 500 });
  }
} 