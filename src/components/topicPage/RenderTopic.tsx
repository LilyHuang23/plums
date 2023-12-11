// @ts-nocheck
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

import UpdateForm from "./updateForm.js";
import Image from "next/image";
export default function RenderTopic() {
  const [topic, setTopic] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    topicName: "",
    description: "",
    attachments: [],
    notes: [],
    links: [],
    parentId: "",
  });

  const searchParams = usePathname();
  const id = searchParams?.split("/").pop();

  // Get request
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTopic(data);
          console.log(data);
        } else {
          toast.error("Error getting topic", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });
          throw new Error("Failed to fetch topics.");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);

        toast.error("Error getting topics", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      }
    };

    fetchTopic();
  }, [id]);

  // Delete request
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this topic?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (response.ok) {
          toast.success("Topic deleted successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });
          ``;
        } else {
          toast.error("Error deleting topic", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });

          throw new Error("Failed to delete to`pic.");
        }
      } catch (error) {
        console.error("Error deleting topic:", error);
      }
    }
  };

  const handleUpdate = () => {
    setFormData({
      topicName: topic.topicName || "",
      description: topic.description || "",
      notes: topic.notes || [],
      links: topic.links || [],
      attachments: topic.attachments || [],
      parentId: topic.parentId || [],
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Topic updated successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        toast.error("Error updating topic", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });

        throw new Error("Failed to update topic.");
      }
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <div>
      {!showForm ? (
        <>
          <h1>{topic.topicName}</h1>
          <p>{topic.description}</p>

          {topic.parentTopic && (
            <a href={`/topics/${topic.parentTopic.id}`}> {topic.parentTopic.topicName}</a>
          )}

          {topic.childTopics && topic.childTopics.length > 0 && (
            <div>
              <h3>Children Topics:</h3>
              <ul>
                {topic.childTopics.map((child) => (
                  <li key={child.id}>
                    <a href={`/topics/${child.id}`}>{child.topicName}</a>
                    </li>
                ))}
              </ul>
            </div>
          )}

          <div className="attachments">
            {topic.attachments &&
              topic.attachments.map((attachment, index) => (
                <Image
                  key={index}
                  src={attachment.content}
                  alt={`Attachment ${index}`}
                />
              ))}
          </div>

          <div className="notes">
            <h2>Notes:</h2>
            {topic.notes &&
              topic.notes.map((note) => (
                <div key={note.id}>
                  <p>{note.content}</p>
                </div>
              ))}
          </div>

          <div className="links">
            <h2>Links:</h2>
            {topic.links &&
              topic.links.map((link) => (
                <div key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </div>
              ))}
          </div>

          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <UpdateForm formValues={formData} />
      )}
    </div>
  );
}
