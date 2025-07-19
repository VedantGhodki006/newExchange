import { NextResponse } from 'next/server';
import { logoutUser } from '../../../../lib/auth';

export async function POST() {
  const result = logoutUser(); 

  const response = NextResponse.json(result);

  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return response;
}
