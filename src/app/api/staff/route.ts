import { mysql } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 处理图片
    const photo = formData.get('photo') as File | null;
    let photoBuffer = null;
    if (photo) {
      const arrayBuffer = await photo.arrayBuffer();
      photoBuffer = Buffer.from(arrayBuffer);
    }

    // 准备插入数据
    const staffData = {
      username: formData.get('username'),
      full_name: formData.get('full_name'),
      gender: formData.get('gender'),
      position: formData.get('position'),
      hire_date: formData.get('hire_date'),
      department: formData.get('department'),
      photo: photoBuffer
    };

    // 插入数据
    await mysql.query(
      'INSERT INTO staff (username, full_name, gender, photo, position, hire_date, department) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        staffData.username,
        staffData.full_name,
        staffData.gender,
        staffData.photo,
        staffData.position,
        staffData.hire_date,
        staffData.department
      ]
    );

    return NextResponse.json({ message: '员工添加成功' });
  } catch (error) {
    console.error('添加员工失败:', error);
    return NextResponse.json({ error: '添加员工失败' }, { status: 500 });
  }
} 