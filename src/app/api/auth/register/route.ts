import { NextResponse } from "next/server";
import { connectToDataBase } from "helpers/server-helpers";
import prisma from "../../../../../prisma/prisma";
import bcrypt from 'bcrypt'

export async function POST (req: Request) {
    
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || password)
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectToDataBase()
        const user = await prisma.user.create({
            data: { email, name, hashedPassword },
        });
        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.log("auth route error", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });

    } finally {
        await prisma.$disconnect();
    }
}