import prisma from "./prisma";

// READ
export const getAllTopics = async () => {
    const topics = await prisma.topics.findMany({});
    return topics;
}

export const getTopic = async id => {
    const topic = await prisma.topics.findUnique({
        where: { id }
    })
    return topic;
}

// CREATE 
export const createTopic = async ( userId, topicName, description, notes, links, label) => {
    const result = await prisma.$transaction(async (prisma) => {
        console.log("Test 3 {Inside createTopic()}");
        console.log(topicName);
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
        const createdNotes = await prisma.notes.createMany({
            data: notes.map((content) => ({
                content, 
                topicId: createdTopic.id,
                label,
            })),
        });

        // Add link to links collection with given data, connect it to current topic being made
        const createdLinks = await prisma.links.createMany({
            data: links.map((url) => ({
                url,
                topicId: createdTopic.id,
                label,
            }))
        });

        return {createdTopic, createdNotes, createdLinks };
    })

    return result;
}

// UPDATE
export const updateTopic = async (id, topicName, description, newNotes, newLinks, notesToDelete, linksToDelete, label) => {

    const result = await prisma.$transaction(async (prisma) => {
        // Udate topic information
        const updatedTopic = await prisma.topics.update({
            where: { id },
            data: {
                topicName, 
                description,
                label
            },
        });

        // Delete specified notes the user wants deleted
        await prisma.notes.deleteMany({
            where: {
                topicId: id,
                id: { in: notesToDelete },
                label,
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
                label,
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