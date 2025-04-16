import { mysql } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 验证必填字段
    const requiredFields = ['username', 'full_name', 'gender', 'position', 'hire_date', 'department'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json({ error: `缺少必填字段: ${field}` }, { status: 400 });
      }
    }

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
  } catch (error: any) {
    console.error('添加员工失败:', error);
    
    // 检查是否是唯一键冲突
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: '用户名已存在' }, { status: 400 });
    }
    
    // 检查是否是外键约束错误
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return NextResponse.json({ error: '选择的部门不存在' }, { status: 400 });
    }

    return NextResponse.json({ error: '添加员工失败' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await mysql.query('SELECT * FROM staff');
    // 确保日期格式正确
    const formattedRows = (rows as any[]).map((row) => {
      const hireDate = row.hire_date ? new Date(row.hire_date) : null;
      const lastUpdated = row.last_updated ? new Date(row.last_updated) : null;

      return {
        ...row,
        hire_date: hireDate ? hireDate.toISOString() : null,
        last_updated: lastUpdated ? lastUpdated.toISOString() : null
      };
    });
    return NextResponse.json(formattedRows);
  } catch (error) {
    console.error('获取员工列表失败:', error);
    return NextResponse.json({ error: '获取员工列表失败' }, { status: 500 });
  }
} 