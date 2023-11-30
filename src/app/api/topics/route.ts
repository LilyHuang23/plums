import { NextApiHandler } from 'next';
import { NextResponse } from 'next/server';

import {
    getAllTopics,
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic
} from '../../../../prisma/topics'
import { log } from 'console';

// Gets list of all topics 
export async function GET (req, res) {
    const topics = await getAllTopics();
    return Response.json(topics);
}

export async function POST (req, { params }) {
    console.log("Test 2 Inside POST {route.ts}")
    const body = await req.json();
    
    try {
        const { userId, topicName, description, notes, links, label } = body;
        // const {value} = req.body

        const topic = createTopic( userId, topicName, description, notes, links, label);
        return NextResponse.json(topic);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating topic.'})
    }
}

