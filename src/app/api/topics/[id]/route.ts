import { NextApiHandler } from 'next';
import {
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic
} from '../../../../../prisma/topics'

export async function GET (req, { params }) {
    const { id } = params;
    const topic = await getTopic(id);

    if (topic) {
        console.log("test");
        return Response.json(topic, { status: 200 });
    } else {
        return Response.json({ message: 'Topic not found' }, { status: 404 });
    }
}

export async function PUT (req, { params }) {
    const { id } = params;
    const { topicName, description, newNotes, newLinks, notesToDelete, linksToDelete } = req.body;

    try {
        const result = await updateTopic(
            topicName,
            description,
            newNotes,
            newLinks,
            notesToDelete,
            linksToDelete
        )

        return Response.json(result, {status: 200 });
    } catch (error) {
        return Response.json({ message: 'Topic not found' }, { status: 404 });
    }
}

export async function DELETE(req, res) {
    const { id } = params;

    try {
        await deleteTopic(id);
        return Response.json({message: 'Successfully deleted topic'}, {status: 200 });
    } catch (error) {
        return Response.json({ message: 'Error deleting topic' }, { status: 404 });
    }
}