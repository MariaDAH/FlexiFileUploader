import { auth } from "@/services/auth";
import {NextRequest, NextResponse } from "next/server"
import { list } from '@vercel/blob';
import { } from  '@/context/interfaces/file'

export const GET = async (req: NextRequest, res: NextResponse) => {
    const session = await auth();

    if (!session?.user) {
        return new NextResponse(`You are not authenticated!`, { status: 401 });
    }

    try {
        const blobs = await list();
        //console.log(blobs);
        return new NextResponse(JSON.stringify(blobs.blobs), {status: 200} );
    } catch (error) {
        console.error('Error listing blobs:', error);
        return new NextResponse("Error fetching blobs", {status: 500} );
    }
}