import {NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const url = new URL(req.url);

    const page = url.searchParams.get("page") ?? '1'
    const limit = url.searchParams.get("limit") ?? '10'

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;

    const data = await req.json();

    const paginatedData = data?.data.slice(start, end);

    const response = {
        page: pageNumber,
        limit: pageSize,
        total: data.data.length,
        data: paginatedData
    }

    console.log('PAGINATED DATA', response.data.length);

    return NextResponse.json(response, {status: 200 } );

}