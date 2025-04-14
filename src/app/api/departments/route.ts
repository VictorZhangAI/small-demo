import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM departments ORDER BY id');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const [result] = await pool.query(
      'INSERT INTO departments (name) VALUES (?)',
      [name]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding department:', error);
    return NextResponse.json({ error: 'Failed to add department' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    const [result] = await pool.query(
      'UPDATE departments SET name = ? WHERE id = ?',
      [name, id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const [result] = await pool.query(
      'DELETE FROM departments WHERE id = ?',
      [id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
  }
} 