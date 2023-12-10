import { NextApiHandler } from 'next';
import { NextResponse } from 'next/server';

import {
    getAllTags,
    createTag
} from '../../../../prisma/topics'

// Gets list of all topics 
export async function GET (req, res) {
    const tags = await getAllTags();
    return Response.json(tags);
}

export async function POST (req, { params }) {
    const body = await req.json();
    
    try {
        const { name } = body;
        const tags = createTag(name)
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating topic.'})
    }
}

