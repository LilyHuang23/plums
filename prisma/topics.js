import prisma from "./prisma";

// READ
export const getAllTopics = async () => {
    const topics = await prisma.topics.findMany({});
    // console.log(topics);
    return topics;
}

export const getTopic = async id => {
    console.log("test")
    const topic = await prisma.topics.findUnique({
        where: { id }
    })
    return topic;
}

// CREATE 
export const createTopic = async ( userId, topicName, description, notes, links) => {
    const result = await prisma.$transaction(async (prisma) => {

        // Add topic to topics collection with given data
        const createdTopic = await prisma.topics.create({
            data: {
                topicName,
                description, 
                userId,
            },
        });

        // Add note to notes collection with given data, connect it to current topic being made
        const createdNotes = await prisma.notes.createMany({
            data: notes.map((content) => ({
                content, 
                topicId: createdTopic.id,
            })),
        });

        // Add link to links collection with given data, connect it to current topic being made
        const createdLinks = await prisma.links.createMany({
            data: links.map((url) => ({
                url,
                t,opicId: createdTopic.id,
            }))
        });

        return {createdTopic, createdNotes, createdLinks };
    })

    console.log(result)
    return result;
}

// UPDATE
export const updateTopic = async (id, topicName, description, newNotes, newLinks, notesToDelete, linksToDelete) => {

    const result = await prisma.$transaction(async (prisma) => {
        // Udate topic information
        const updatedTopic = await prisma.topics.update({
            where: { id },
            data: {
                topicName, 
                description,
            },
        });

        // Delete specified notes the user wants deleted
        await prisma.notes.deleteMany({
            where: {
                topicId: id,
                id: { in: notesToDelete },
            },
        });

        // Add new notes
        const createdNotes = await prisma.notes.createMany({
            data: newNotes.map((content) => ({
                content,
                topicId: updatedTopic.id,
            })),
        });

        
        // Repeat the process with links
        await prisma.links.deleteMany({
            where: {
                topicId: id,
                id: { in: linksToDelete },
            },
        });

        const createdLinks = await prisma.links.createMany({
            data: newLinks.map((url) => ({
                url, 
                topicId: updatedTopic.id,
            })),
        })

        return { updatedTopic, createdNotes, createdLinks };
    });

    return result;
};

// DELETE
export const deleteTopic = async (id) => {
    const result = await prisma.$transaction(async (prisma) => {
        
        // Delete associated topic
        await prisma.topics.delete({
            where: { id },
        })

        // Delete associated notes
        await prisma.notes.deleteMany({
            where: { topicId: id },
        })

        // Delete associated links
        await prisma.links.deleteMany({
            where: {topicId: id },
        });
    });

    return result;
}