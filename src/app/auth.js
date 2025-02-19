import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

async function getToken() {
  const cookieHeader = await cookies();

  return await cookieHeader.get('token')?.value;
}

export default async function auth() {
  const token = await getToken();
  console.log(token)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/login`)
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.error('Invalid token', error);
    return NextResponse.redirect(`${baseUrl}/login`)
  }

  // If token is valid, just return – no redirect here
  return true;
}
