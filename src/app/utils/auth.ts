import bcrypt from 'bcryptjs';
import pool from './db';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

// 注册新用户
export const registerUser = async (username: string, password: string): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    
    try {
      // 检查用户名是否已存在
      const [existingUsers] = await connection.query<User[]>(
        'SELECT id FROM users WHERE username = ?',
        [username]
      );

      if (existingUsers.length > 0) {
        return false;
      }

      // 加密密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 插入新用户
      await connection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );

      return true;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

// 验证用户登录
export const validateUser = async (username: string, password: string): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    
    try {
      // 查找用户
      const [users] = await connection.query<User[]>(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (users.length === 0) {
        return false;
      }

      // 验证密码
      const user = users[0];
      return await bcrypt.compare(password, user.password);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}; 