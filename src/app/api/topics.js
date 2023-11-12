import {
    getAllTopics,
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic
} from '../../../prisma/topics'

// export default async function handle (req, res) {
//     try {
//         switch (req.method) {
//             case 'GET': {
//                 console.log("Test");
//                 // If there's an id in the request, get just the one
//                 if (req.query.id) {
//                     const topic = await getTopic(req.query.id);
//                     if (topic) {
//                         return res.status(200).json(topic);
//                     } else {
//                         return res.status(404).json({ message: 'Topic not found' });
//                     }
//                 } else {
//                     const topics = await getAllTopics();
//                     return res.json(topics);
//                 }
//             }
//             case 'POST' : {
//                 const { userId, topicName, description, notes, links } = req.body;
//                 const topic = await createTopic(userId, topicName, description, notes, links);
//                 return res.json(topic)
//             }
//         }
    // } catch (error) {
    //     return res.status(500).json({ ...error, message: error.message })
    //   }
// }