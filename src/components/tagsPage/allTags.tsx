// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

export default function AllTags() {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tags', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTags(data);
                    console.log(data);
                } else {
                    toast.error('Error getting tags', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    });
                    throw new Error('Failed to fetch tags.');
                }
            } catch (error) {
                console.error('Error fetching tags:', error)

                toast.error('Error getting tags', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                  });
            }
        }

        fetchTags();
    }, []);

    const handleTagSelection = (tagId) => {
        const updatedSelectedTags = selectedTags.includes(tagId)
          ? selectedTags.filter((id) => id !== tagId)
          : [...selectedTags, tagId];
            setSelectedTags(updatedSelectedTags);
      };

    return (
        <div>
            <h3>Select Tags</h3>
            {tags.map((tag) => (
            <div key={tag.id}>
                <input
                type="checkbox"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagSelection(tag.id)}
                />
                <label htmlFor={tag.id}>{tag.name}</label>
            </div>
            ))}
        </div>
        );
}