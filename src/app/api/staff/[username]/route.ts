import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const formData = await request.formData();
    const username = params.username;
    const full_name = formData.get('full_name') as string;
    const gender = formData.get('gender') as string;
    const position = formData.get('position') as string;
    const hire_date = formData.get('hire_date') as string;
    const department = formData.get('department') as string;
    const photo = formData.get('photo') as File | null;

    // 验证必填字段
    if (!full_name || !gender || !position || !hire_date || !department) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 处理照片
    let photoBuffer = null;
    if (photo) {
      const bytes = await photo.arrayBuffer();
      photoBuffer = Buffer.from(bytes);
    }

    // 更新员工信息
    const result = await db.query(
      `UPDATE staff 
       SET full_name = $1, gender = $2, position = $3, 
           hire_date = $4, department = $5, photo = $6,
           last_updated = CURRENT_TIMESTAMP
       WHERE username = $7
       RETURNING *`,
      [full_name, gender, position, hire_date, department, photoBuffer, username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: '员工不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('更新员工信息失败:', error);
    return NextResponse.json(
      { error: '更新员工信息失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;

    const result = await db.query(
      'DELETE FROM staff WHERE username = $1 RETURNING *',
      [username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: '员工不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除员工失败:', error);
    return NextResponse.json(
      { error: '删除员工失败' },
      { status: 500 }
    );
  }
} 