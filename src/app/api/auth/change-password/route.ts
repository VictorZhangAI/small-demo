import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/app/utils/db';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { username, oldPassword, newPassword } = body;
    console.log('Extracted values:', { username, oldPassword, newPassword });

    if (!username || !oldPassword || !newPassword) {
      console.log('Missing fields:', {
        hasUsername: !!username,
        hasOldPassword: !!oldPassword,
        hasNewPassword: !!newPassword
      });
      return NextResponse.json(
        { success: false, message: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    try {
      // 查找用户
      const [users] = await connection.query<User[]>(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (users.length === 0) {
        return NextResponse.json(
          { success: false, message: '用户不存在' },
          { status: 404 }
        );
      }

      const user = users[0];

      // 验证旧密码
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, message: '原密码错误' },
          { status: 401 }
        );
      }

      // 加密新密码
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // 更新密码
      await connection.query(
        'UPDATE users SET password = ? WHERE username = ?',
        [hashedNewPassword, username]
      );

      return NextResponse.json({
        success: true,
        message: '密码修改成功'
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
} 