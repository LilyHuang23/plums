import { NextApiHandler } from 'next';
import { NextResponse } from 'next/server';

import {
    getUser,
    createUser,
} from '../../../../../prisma/user'

// Gets user
export async function GET (req, res) {
    const topics = await getUser();
    return Response.json(topics);
}

export async function POST (req, { params }) {

    const body = await req.json();
    
    try {
        const { id, username, email, hashedPassword, securityQuestion, accessLevel, topics } = body;


        const topic = createUser( id, username, email, hashedPassword, securityQuestion, accessLevel, topics);
        return NextResponse.json(topic);
    } catch (error) {
        return NextResponse.json({ error: 'Error getting new user.'})
    }
}

