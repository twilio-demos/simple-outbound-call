import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  const to = process.env.NEXT_PUBLIC_TO;
  const from = process.env.NEXT_PUBLIC_FROM;

  if (!to || !from) {
    return NextResponse.json({ error: 'Missing environment variables.' }, { status: 500 });
  }

  try {
    const response = await axios.post('https://cr-agent-pristine-1a765a90f60e.herokuapp.com/outbound-call', {
      to,
      from,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    const message = error.response?.data?.error || error.message || 'Failed to place call.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
