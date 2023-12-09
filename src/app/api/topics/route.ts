import { NextApiHandler } from 'next';
import { NextResponse } from 'next/server';

import {
    getAllTopics,
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic
} from '../../../../prisma/topics'

// Gets list of all topics 
export async function GET (req, res) {
    const topics = await getAllTopics();
    return Response.json(topics);
}

export async function POST (req, { params }) {
    const body = await req.json();
    
    try {
        const { userId, topicName, description, notes, links, label, attachments, parentId } = body;

        const topic = createTopic( userId, topicName, description, notes, links, label, attachments, parentId);
        return NextResponse.json(topic);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating topic.'})
    }
}

