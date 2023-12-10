// @ts-nocheck
'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function TagForm() {
  const [tagName, setTagName] = useState('');

  const handleInputChange = (e) => {
    setTagName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tagName }),
      });

      if (response.ok) {
        toast.success('Tag added successfully!', {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });

        // Clear the input field after successful addition
        setTagName('');
      } else {
        throw new Error('Failed to add tag.');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      toast.error('Failed to add tag. Please try again.', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tag Name:
        <input
          type="text"
          value={tagName}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Add Tag</button>
    </form>
  );
}