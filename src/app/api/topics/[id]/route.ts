import { NextApiHandler } from 'next';
import {
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic
} from '../../../../../prisma/topics'

export async function GET (req, res) {
    console.log("test")
    
    const { id } = req.query;
    const topic = await getTopic(id);

    if (topic) {
        console.log("test");
        return Response.json(topic, { status: 200 });
    } else {
        return Response.json({ message: 'Topic not found' }, { status: 404 });
    }
}

// export default async function handler(req, res) {
//     try {
//         switch (req.method) {
//             case 'GET': {
//                 const { id } = req.query;
//                 console.log(id);
//             }
//         }
//     } catch (error) {
//         return res.status(500).json({ ...error, message: error.message })
//       }
// }
