import { auth } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

//ToDo: Return available connectors (vercel and localhost)
export const GET = async (request: NextRequest) => {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(`You are not authenticated!`, { status: 401 });
  }

  return new NextResponse(JSON.stringify("Test"), { status: 201 });
};
