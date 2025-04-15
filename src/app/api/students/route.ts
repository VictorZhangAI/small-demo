import { NextResponse } from 'next/server';
import { mysql } from '@/lib/mysql';

export async function GET() {
  try {
    const [rows] = await mysql.query('SELECT * FROM students');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { student_id, name, class: class_name, gender, phone, education_level, violation_count, violation_points } = data;

    const [result] = await mysql.query(
      'INSERT INTO students (student_id, name, class, gender, phone, education_level, violation_count, violation_points) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [student_id, name, class_name, gender, phone, education_level, violation_count, violation_points]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json({ error: 'Failed to add student' }, { status: 500 });
  }
}