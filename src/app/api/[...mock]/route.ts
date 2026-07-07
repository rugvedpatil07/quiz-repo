import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.pathname.includes('/leaderboard') || url.pathname.includes('/quizzes')) {
    return NextResponse.json([]);
  }
  if (url.pathname.includes('/profile')) {
    return NextResponse.json({ totalXP: 0 });
  }
  return NextResponse.json({});
}

export async function POST(req: Request) {
  return NextResponse.json({ success: true, message: "Mock POST endpoint" });
}

export async function PUT(req: Request) {
  return NextResponse.json({ success: true, message: "Mock PUT endpoint" });
}

export async function DELETE(req: Request) {
  return NextResponse.json({ success: true, message: "Mock DELETE endpoint" });
}
