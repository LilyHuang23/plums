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
            parentTopic: true,
            childTopics: true,
        },
    })
    return topic;
}

// CREATE 
export const createTopic = async ( userId, topicName, description, notes, links, label, attachments, parentId) => {
    const result = await prisma.$transaction(async (prisma) => {
        // Add topic to topics collection with given data
        const createdTopic = await prisma.topics.create({
            data: {
                topicName,
                description, 
                userId,
                label,
                parentId,
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
                                  updateNotes, newNotes, notesToDelete, 
                                  updateLinks, newLinks, linksToDelete, 
                                  newAttachments, attachmentsToDelete,
                                  label) => {

    console.log("TEST #2 - PRISMA TOPICS.JS")
    console.log("New notes:", newNotes);
    console.log("Deleted notes:", notesToDelete);
    console.log("New links:", newLinks);
    console.log("Deleted links:", linksToDelete);
    console.log("New attachments:", newAttachments);
    console.log("Deleted attachments:", attachmentsToDelete);

    const result = await prisma.$transaction(async (prisma) => {
        // Udate topic information
        const updatedNotes = [];
        const updatedLinks = [];

        // Update Topics
        const updatedTopic = await prisma.topics.update({
            where: { id },
            data: {
                topicName, 
                description,
                label
            },
        });

        // Create new attachments
        console.log(newAttachments);
        if (newAttachments && newAttachments.length > 0) {
                const createdAttachments = await prisma.attachments.createMany({
                    data: newAttachments.map((attachment) => ({
                        content: attachment.value,
                        topicId: updatedTopic.id,
                        label: attachment.label,
                    }))
                });
            }

        // Delete attachments
        if (attachmentsToDelete && attachmentsToDelete.length > 0) {
            await prisma.attachments.deleteMany({
                where: {
                    topicId: id,
                    id: { in: attachmentsToDelete },
                },
            });
        }


        // Update notes
        if (updateNotes && updateNotes.length > 0) {
            for (const { id: noteId, content: updatedNoteContent } of updateNotes) {
                const updatedNote = await prisma.notes.update({
                where: { id: noteId },
                data: {
                    content: updatedNoteContent,
                    label: label,
                },
                });
                updatedNotes.push(updatedNote);
            }
        }


        // Delete notes that the user wants deleted
        if (notesToDelete && notesToDelete.length > 0) {
            console.log("test 3")
            
            await prisma.notes.deleteMany({
                where: {
                    topicId: id,
                    id: { in: notesToDelete },
                },
            });
        }

        // Add new notes
        if (newNotes && newNotes.length > 0) {
            await prisma.notes.createMany({
                data: newNotes.map((note) => ({
                    content: note.value,
                    topicId: updatedTopic.id,
                })),
            });
        }

        // Update individual links
        if (updateLinks && updateLinks.length > 0) {
            for (const { id: linkId, url: updatedLinkContent } of updateLinks) {
            const updatedLink = await prisma.links.update({
                where: { id: linkId },
                data: {
                    url: updatedLinkContent,
                },
            });
            updatedLinks.push(updatedLink);
            }
        }
        
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
                data: newLinks.map((link) => ({
                    url: link.value, 
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