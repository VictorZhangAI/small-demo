import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { validateUser } from '@/app/utils/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const isValid = await validateUser(username, password);

    if (isValid) {
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
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
} 