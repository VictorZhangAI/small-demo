import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    // 确保 params 是有效的
    if (!params?.username) {
      return NextResponse.json(
        { error: '用户名参数缺失' },
        { status: 400 }
      );
    }

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
    const [result] = await pool.query(
      `UPDATE staff 
       SET full_name = ?, gender = ?, position = ?, 
           hire_date = ?, department = ?, photo = ?
       WHERE username = ?`,
      [full_name, gender, position, hire_date, department, photoBuffer, username]
    );

    if (!result || (result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: '员工不存在' },
        { status: 404 }
      );
    }

    // 获取更新后的员工信息
    const [rows] = await pool.query(
      'SELECT * FROM staff WHERE username = ?',
      [username]
    ) as [any[], any];

    return NextResponse.json(rows[0]);
  } catch (error: any) {
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
    // 确保 params 是有效的
    if (!params?.username) {
      return NextResponse.json(
        { error: '用户名参数缺失' },
        { status: 400 }
      );
    }

    const username = params.username;

    const [result] = await pool.query(
      'DELETE FROM staff WHERE username = ?',
      [username]
    );

    if (!result || (result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: '员工不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '员工删除成功' });
  } catch (error: any) {
    console.error('删除员工失败:', error);
    return NextResponse.json(
      { error: '删除员工失败' },
      { status: 500 }
    );
  }
} 