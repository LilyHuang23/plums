import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function UpdateForm({ formValues }) {    
  const [formData, setFormData] = useState(formValues);

  // UseState variable to update when user wants to delete just one note or link
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [deletedLinks, setDeletedLinks] = useState([]);


  // For getting ID from the pathname for the update statement
  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();

  // For when user clicks delete.
  // Takes in index of where it is rendered on page,
  // splices it, gets the mongoId with [0], adds it to deleted notes.
  const handleDeleteNote = (index) => {
    const updatedNotes = [...formData.notes];
    const deletedNote = updatedNotes.splice(index, 1)[0];
    setFormData({ ...formData, notes: updatedNotes });

    // Add the deleted note to the deletedNotes state
    setDeletedNotes([...deletedNotes, deletedNote]);
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = [...formData.links];

    const deletedLink = updatedLinks.splice(index, 1)[0];
    setFormData({ ...formData, links: updatedLinks });

    // Add the deleted link to the deletedLinks state
    setDeletedLinks([...deletedLinks, deletedLink]);
  };

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          topicId: id,
          topicName: formData.topicName,
          description: formData.description,
          newNotes: formData.notes,
          newLinks: formData.links,
          notesToDelete: deletedNotes.map((note) => note.id),
          linksToDelete: deletedLinks.map((link) => link.id),
          label: "label",
        }),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Failed to update topic.");
      }
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.topicName}
        onChange={(e) =>
          setFormData({ ...formData, topicName: e.target.value })
        }
      />
      <input
        type="text"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      {/* Input fields for links */}
      {formData.links.map((link, index) => (
        <div key={index}>
          <input
            type="text"
            value={link.url}
            onChange={(e) => {
              const updatedLinks = [...formData.links];
              updatedLinks[index].url = e.target.value;
              setFormData({ ...formData, links: updatedLinks });
            }}
          />

          <button type="button" onClick={() => handleDeleteLink(index)}>
            Delete Link
          </button>
        </div>
      ))}

      {/* Input fields for notes */}
      {formData.notes.map((note, index) => (
        <div key={index}>
          <input
            type="text"
            value={note.content}
            onChange={(e) => {
              const updatedNotes = [...formData.notes];
              updatedNotes[index].content = e.target.value;
              setFormData({ ...formData, notes: updatedNotes });
            }}
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

{
  /* Input fields for attachments */
}
//   {formData.attachments.map((attachment, index) => (
//     <div key={index}>
//       <input
//         type="text"
//         value={attachment.content}
//         onChange={(e) => {
//           const updatedAttachments = [...formData.attachments];
//           updatedAttachments[index].content = e.target.value;
//           setFormData({ ...formData, attachments: updatedAttachments });
//         }}
//       />
//       {/* Add other fields for attachment properties if needed */}
//     </div>
//   ))}
