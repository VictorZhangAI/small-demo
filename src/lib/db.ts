import { mysql } from '@/lib/mysql';

export interface Staff {
  username: string;
  full_name: string;
  gender: '男' | '女';
  photo: Buffer | null;
  position: '班主任' | '讲师' | '学工主管' | '教研主管';
  hire_date: Date;
  department: string | null;
  last_updated: Date;
}

export async function getStaffList(): Promise<Staff[]> {
  const [rows] = await mysql.query('SELECT * FROM staff');
  return rows as Staff[];
} 