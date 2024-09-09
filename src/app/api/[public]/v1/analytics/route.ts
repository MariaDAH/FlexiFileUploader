import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/services/auth";
import { analyse } from "@/lib/vercel-blob";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(`You are not authenticated!`, { status: 401 });
  }

  const analysis = await analyse();

  return NextResponse.json(analysis);
}
