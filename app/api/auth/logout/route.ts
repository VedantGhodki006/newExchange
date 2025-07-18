// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { logoutUser } from '../../../../lib/auth';

export async function POST() {
  const result = logoutUser(); // currently just a message

  const response = NextResponse.json(result);

  // Clear the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return response;
}
