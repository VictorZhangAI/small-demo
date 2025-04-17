import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // TODO: 这里应该连接到数据库验证用户名和密码
    // 目前使用硬编码的测试账号
    if (username === 'admin' && password === 'admin123') {
      const token = sign({ username }, JWT_SECRET, { expiresIn: '24h' });
      
      const response = NextResponse.json({ 
        success: true,
        message: '登录成功',
        token
      });

      // 设置cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: '用户名或密码错误' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
} 