import { NextResponse } from 'next/server';
import { mysql } from '@/lib/mysql';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const params = JSON.parse(searchParams.get('params') || '[]');

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const [rows] = await mysql.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error searching students:', error);
    return NextResponse.json({ error: 'Failed to search students' }, { status: 500 });
  }
} 