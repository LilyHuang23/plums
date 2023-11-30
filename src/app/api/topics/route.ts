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
    console.log("Test 2 Inside POST {route.ts}")
    console.log(res);
    // console.log(req);
    const { userId, topicName, description, notes, links, label } = req.body;
    console.log(topicName);

    try {
        const topic = createTopic( userId, topicName, description, notes, links, label);
        return Response.json(topic);
    } catch (error) {
        return Response.json({ error: 'Error creating topic.'})
    }
}

