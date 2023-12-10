// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Card from "./allTopicsPage/card";

export default function AllTopics({ renderAsSelect = false }) {
    const [topics, setTopics ] = useState([]);

    useEffect(() => {
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

    if (renderAsSelect) {
      return (
        <div>
          <h1>Parent Topic:</h1>
          <select id="parentTopicSelect">
            <option value="">- Select -</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.topicName}
              </option>
            ))}
          </select>
        </div>
      );
    }
  
    return (
      <div>
        <h1>All Topics</h1>
        <div className="topics-list">
          {topics.map((topic) => (
            <Card key={topic.id} topicId={topic.id} topicName={topic.topicName} />
          ))}
        </div>
      </div>
    );
  };
