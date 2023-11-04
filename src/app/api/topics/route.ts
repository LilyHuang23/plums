import { NextResponse  } from "next/server"

export async function GET(request: Request) {
    return new Response("Hello world!", {
        status: 200,
    })
}

export async function POST(request: Request) {
    return new Response("Hello with POST!", {
        status: 200,
    })
}