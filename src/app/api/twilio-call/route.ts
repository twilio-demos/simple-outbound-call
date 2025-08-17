import { NextResponse } from 'next/server';

export async function POST() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const to = process.env.NEXT_PUBLIC_TO;
  const from = process.env.NEXT_PUBLIC_FROM;

  if (!accountSid || !authToken || !to || !from) {
    return NextResponse.json({ error: 'Missing environment variables.' }, { status: 500 });
  }

  const twilio = require('twilio')(accountSid, authToken);

  const url='cr-agent-pristine-1a765a90f60e.herokuapp.com'

  try {
    const call = await twilio.calls.create({
      url: `https://cr-agent-pristine-1a765a90f60e.herokuapp.com/outbound-call`,
      to,
      from,
    });
    return NextResponse.json({ success: true, sid: call.sid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
