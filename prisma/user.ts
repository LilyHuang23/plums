import prisma from "./prisma";

// READ
// export const getAllUsers = async () => {
//     const users = await prisma.users.findMany({
//         include: {
//             notes: true,
//             links: true, 
//         },
//     });
//     return users;
// }

export const getUser = async id => {
    const User = await prisma.Users.findUnique({
        where: { id },
        include: {
            notes: true,
            links: true, 
        },
    })
    return User;
}

// CREATE 
export const createUser = async ( id, username, email, hashedPassword, securityQuestion, accessLevel, topics) => {
    const result = await prisma.$transaction(async (prisma) => {
        // Add User to Users collection with given data
        const createdUser = await prisma.Users.create({
            data: {
                id,
                username,
                email,
                hashedPassword,
                securityQuestion,
                accessLevel,
                topics
            },
        });
       
        // Add note to notes collection with given data, connect it to current User being made
        // if (notes && notes.length > 0) { 
        //     const createdNotes = await prisma.notes.createMany({
        //         data: notes.map((content) => ({
        //             content, 
        //             userId: createdUser.id,
        //             label,
        //         })),
        //     });
        // }

        // if (links && links.length > 0) {
        // // Add link to links collection with given data, connect it to current User being made
        //     const createdLinks = await prisma.links.createMany({
        //         data: links.map((url) => ({
        //             url,
        //             userId: createdUser.id,
        //             label,
        //         }))
        //     });
        // }

        return {createdUser}; //, createdNotes, createdLinks
    })

    return result;
}

// UPDATE
// export const updateUser = async (id, username, email, hashedPassword, securityQuestion, accessLevel, createdAt, label, topics) => {

//     const result = await prisma.$transaction(async (prisma) => {
//         // Udate User information
//         const updatedUser = await prisma.Users.update({
//             where: { id },
//             data: {
//                 id, username, email, hashedPassword, securityQuestion, accessLevel, createdAt, label, topics
//             },
//         });

//         // Delete specified notes the user wants deleted
//         await prisma.notes.deleteMany({
//             where: {
//                 userId: id,
//                 id: { in: notesToDelete },
//                 label,
//             },
//         });

//         // Add new notes
//         const createdNotes = await prisma.notes.createMany({
//             data: newNotes.map((content) => ({
//                 content,
//                 userId: updatedUser.id,
//             })),
//         });

        
//         // Repeat the process with links
//         await prisma.links.deleteMany({
//             where: {
//                 userId: id,
//                 id: { in: linksToDelete },
//             },
//         });

//         const createdLinks = await prisma.links.createMany({
//             data: newLinks.map((url) => ({
//                 url, 
//                 userId: updatedUser.id,
//                 label,
//             })),
//         })

//         return { updatedUser, createdNotes, createdLinks };
//     });

//     return result;
// };

// // DELETE
// export const deleteUser = async (id) => {
//     const result = await prisma.$transaction(async (prisma) => {
        
//         // Delete associated User
//         await prisma.Users.delete({
//             where: { id },
//         })

//         // Delete associated notes
//         await prisma.notes.deleteMany({
//             where: { userId: id },
//         })

//         // Delete associated links
//         await prisma.links.deleteMany({
//             where: {userId: id },
//         });
//     });

//     return result;
// }