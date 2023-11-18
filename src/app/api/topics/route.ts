import { NextApiHandler } from 'next';
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

export async function POST (req, res) {
    const { userId, topicName, description, notes, links } = req.body;

    try {
        const topic = createTopic( userId, topicName, description, notes, links);
        return Response.json(topic);
    } catch (error) {
        return Response.json({ error: 'Error creating topic.'})
    }
}

