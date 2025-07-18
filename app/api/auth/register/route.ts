import { NextResponse } from 'next/server';
import { registerUser } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { token, user } = await registerUser(body);

    const response = NextResponse.json({ user });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 400 }
    );
  }
}
