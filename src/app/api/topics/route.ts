import { NextApiHandler } from 'next';
import {
    getAllTopics,
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic
} from '../../../../prisma/topics'

export async function GET (req, res) {
    console.log("test")
    const topics = await getAllTopics();
    return Response.json(topics);
}