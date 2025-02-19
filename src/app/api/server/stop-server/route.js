import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

export async function POST() {
  try {
    const response = await fetch(
      `https://api.idcloudhost.com/v1/jkt01/user-resource/vm/stop?uuid=${process.env.API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'apikey': process.env.API_KEY,
        },
        cache: 'no-store', // Prevents caching in Next.js server components
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch server info: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching server info:', error);
    return NextResponse.json({ error: 'Failed to fetch server info' }, { status: 500 });
  }
}
