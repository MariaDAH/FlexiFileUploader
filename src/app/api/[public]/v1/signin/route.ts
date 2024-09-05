import { User } from '@/context/interfaces/user';
import {NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    console.log('Creating user...');
    const { username, password } = await req.json();

    const user: User = {
        name: username,
        email: 'maria@email.com',
        password: password,
        image: 'https://s3.amazonaws.com/uploads/2020/02/maria.png',
    };

    //ToDo: Go to database and check if user exists
    return NextResponse.json(user, { status: 200 });
}

