import prisma from "./prisma";

// READ
export const getAllTopics = async () => {
    const topics = await prisma.topics.findMany({
        // include: {
        //     notes: true,
        //     links: true, 
        // },
    });
    return topics;
}

export const getTopic = async id => {
    const topic = await prisma.topics.findUnique({
        where: { id },
        include: {
            notes: true,
            links: true, 
            attachments: true,
        },
    })
    return topic;
}

// CREATE 
export const createTopic = async ( userId, topicName, description, notes, links, label, attachments) => {
    const result = await prisma.$transaction(async (prisma) => {
        // Add topic to topics collection with given data
        const createdTopic = await prisma.topics.create({
            data: {
                topicName,
                description, 
                userId,
                label,
            },
        });

        // Add note to notes collection with given data, connect it to current topic being made
        if (notes && notes.length > 0) { 
            const createdNotes = await prisma.notes.createMany({
                data: notes.map((content) => ({
                    content, 
                    topicId: createdTopic.id,
                    label,
                })),
            });
        }

        if (links && links.length > 0) {
        // Add link to links collection with given data, connect it to current topic being made
            const createdLinks = await prisma.links.createMany({
                data: links.map((url) => ({
                    url,
                    topicId: createdTopic.id,
                    label,
                }))
            });
        }

        if (attachments && attachments.length > 0) {
            // Add link to links collection with given data, connect it to current topic being made
                const createdAttachments = await prisma.attachments.createMany({
                    data: attachments.map((content) => ({
                        content,
                        topicId: createdTopic.id,
                        label,
                    }))
                });
            }

        return {createdTopic}; //, createdNotes, createdLinks
    })

    return result;
}

// UPDATE
export const updateTopic = async (id, 
                                  topicName, 
                                  description,
                                  noteId, updatedNoteContent, newNotes, notesToDelete, 
                                  linkId, updatedLinkContent, newLinks, linksToDelete, 
                                  label, attachments) => {
    console.log("TEST #2 - PRISMA.JS")

    const result = await prisma.$transaction(async (prisma) => {
        // Udate topic information
        console.log("TEST");

        // Update Topics
        const updatedTopic = await prisma.topics.update({
            where: { id },
            data: {
                topicName, 
                description,
                label
            },
        });

        console.log(newNotes);
        console.log(notesToDelete);

        // Add update for notes

        // Delete specified notes the user wants deleted
        if (notesToDelete && notesToDelete.length > 0) {
            await prisma.notes.deleteMany({
                where: {
                    topicId: id,
                    id: { in: notesToDelete },
                    label,
                },
            });
        }

        // Add new notes
        if (newNotes && newNotes.length > 0) {
            await prisma.notes.createMany({
                data: newNotes.map((content) => ({
                    content,
                    topicId: updatedTopic.id,
                })),
            });
        }


        // Add update for notes

        
        // Delete anything in LinksToDelete
        if (linksToDelete && linksToDelete.length > 0) {
            await prisma.links.deleteMany({
                where: {
                    topicId: id,
                    id: { in: linksToDelete },
                },
            });
        }

        // Add any new links
        if (newLinks && newLinks.length > 0) {
            const createdLinks = await prisma.links.createMany({
                data: newLinks.map((url) => ({
                    url, 
                    topicId: updatedTopic.id,
                    label,
                })),
            })
        }


        return { updatedTopic };
    });

    return result;
};

// DELETE
export const deleteTopic = async (id) => {
    const result = await prisma.$transaction(async (prisma) => {
        console.log('test2')

        // Delete associated notes
        await prisma.notes.deleteMany({
            where: { topicId: id },
        });

        // Delete associated links
        await prisma.links.deleteMany({
            where: {topicId: id },
        });

        await prisma.attachments.deleteMany({
            where: { topicId: id },
        });

        // Delete associated topic
        await prisma.topics.delete({
            where: { id },
        });
    });

    return result;
}