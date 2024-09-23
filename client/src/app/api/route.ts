import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;

  if (token) {
    return Response.json({ authenticated: true, token });
  } else {
    return Response.json({ authenticated: false });
  }
}
