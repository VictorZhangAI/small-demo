import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = 'SELECT * FROM classes';
    const conditions = [];
    const values = [];

    if (className) {
      conditions.push('class_name LIKE ?');
      values.push(`%${className}%`);
    }

    if (startDate) {
      conditions.push('start_date >= ?');
      values.push(startDate);
    }

    if (endDate) {
      conditions.push('end_date <= ?');
      values.push(endDate);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id ASC';

    const [rows] = await db.query(query, values);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { error: '获取班级列表失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { className, classroom, startDate, endDate, headTeacher } = body;

    const [result] = await db.query(
      'INSERT INTO classes (class_name, classroom, start_date, end_date, head_teacher) VALUES (?, ?, ?, ?, ?)',
      [className, classroom, startDate, endDate, headTeacher]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error adding class:', error);
    return NextResponse.json(
      { success: false, error: '添加班级失败' },
      { status: 500 }
    );
  }
} 