import { User } from '@/context/interfaces/user';
import {NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    //throw new Error("testing error");

    console.log('Creating user...');
    const { username, password, image } = await req.json();

    const user: User = {
        name: username,
        email: 'maria@email.com',
        password: password,
        image: 'https://s3.amazonaws.com/uploads/2020/02/maria.png',
    };

    console.log(user);
    //ToDo: Go to database and insert recordif user doesnt exists
    return NextResponse.json(user, { status: 201 });
}