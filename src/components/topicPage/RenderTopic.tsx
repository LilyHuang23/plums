import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

export default function RenderTopic() {
    const [topics, setTopics ] = useState([]);
    const { topicId } = useParams();

    
    useEffect(() => {
     
        // const [topicData, setTopicData] = useState(null);

        const fetchTopic = async () => {
            console.log(topicId)
            try {
                const response = await fetch(`http://localhost:3000/api/topics/${topicId}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTopics(data);
                    console.log(data);
                } else {
                    toast.error('Error getting topic', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    });
                    throw new Error('Failed to fetch topics.');
                }
            } catch (error) {
                console.error('Error fetching topics:', error)

                toast.error('Error getting topics', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                  });
            }
        }

        fetchTopic();
    }, []);

    return (
        <div>
          <h1></h1>
          <div className="topics-list">
          </div>
        </div>
      );
}