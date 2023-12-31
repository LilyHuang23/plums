// @ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';

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
        return Response.json(topic, { status: 200 });
    } else {
        return Response.json({ message: 'Topic not found' }, { status: 404 });
    }
}

export async function PUT (req, { params }) {
    const { id } = params;
    const body = await req.json();

    const { topicName, 
            description, 
            notesData,
            newNotes, 
            notesToDelete, 
            linksData,
            newLinks, 
            linksToDelete, 
            newAttachments,
            attachmentsToDelete,
            label } = body;

    try {
        const result = await updateTopic(
            id,
            topicName, 
            description, 
            notesData,
            newNotes, 
            notesToDelete, 
            linksData,
            newLinks, 
            linksToDelete, 
            newAttachments,
            attachmentsToDelete,
            label
        )

        return Response.json(result, {status: 200 });
    } catch (error) {
        console.log("TEST");
        return Response.json({ message: 'Topic not found' }, { status: 404 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;

    await deleteTopic(id);
    
    try {
        return Response.json({message: 'Successfully deleted topic'}, {status: 200 });
    } catch (error) {
        return Response.json({ message: 'Error deleting topic' }, { status: 404 });
    }
}