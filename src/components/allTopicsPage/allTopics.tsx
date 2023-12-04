'use client'
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Card from "./card";

export default function AllTopics() {
    const [topics, setTopics ] = useState([]);

    useEffect(() => {
        console.log(topics);
        const fetchTopics = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/topics', {
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
                    toast.error('Error getting topics', {
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

        fetchTopics();
    }, []);

    return (
        <div>
          <h1>All Topics</h1>
          <div className="topics-list">
            {/* Render a Card for each topic */}
            {topics.map((topic) => (
              <Card
                key={topic.id}
                topicName={topic.topicName}
              />
            ))}
          </div>
        </div>
      );
}