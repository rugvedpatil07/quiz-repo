import { NextResponse } from "next/server";

export async function GET() {
  // Mock response for profile data
  return NextResponse.json({ totalXP: 0 });
}

export async function PUT(request: Request) {
  // Mock response for profile update
  return NextResponse.json({ success: true });
}
