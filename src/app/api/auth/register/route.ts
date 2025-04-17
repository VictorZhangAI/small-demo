import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // TODO: 这里应该连接到数据库存储用户信息
    // 目前只是模拟注册成功
    if (username && password) {
      return NextResponse.json({ 
        success: true,
        message: '注册成功'
      });
    }

    return NextResponse.json(
      { success: false, message: '用户名和密码不能为空' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
} 