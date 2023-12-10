// @ts-nocheck
import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

import Input from "components/homePage/input";

export default function UpdateForm({ formValues }) {  
  // All form data  
  const [formData, setFormData] = useState(formValues);

  // Set toggle for showing add button
  const initialToggleState = false;
  const [toggle, setToggle] = useState(initialToggleState);

  // UseState variable to update when user wants to delete a note or link
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [deletedLinks, setDeletedLinks] = useState([]);
  const [deletedAttachments, setDeletedAttachments] = useState([]);

  // New notes, new links, new attachments
  const [newNotes, setNewNotes] = useState([]);
  const [newLinks, setNewLinks] = useState([]);
  const [newAttachments, setNewAttachments] = useState([]);

  // UseRef for add button
  const inputRef = useRef(null);
  const selectRef = useRef(null);

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

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = [...formData.attachments];
    const deletedAttachment = updatedAttachments.splice(index, 1)[0];
    setFormData({ ...formData, attachments: updatedAttachments });

    // Add deleted attachment to the deletddAttachments state
    setDeletedAttachments([ ...deletedAttachments, deletedAttachment])
  };

  // Handle when the first add button is clicked
  const handleAddField = () => {
    setToggle(true);
  }

  // Handle when the second add button is clicked
  const handleAdd = () => {
    const selectedType = selectRef.current.value;

    if (selectedType === "notes") {
      setNewNotes([...newNotes, {label: inputRef.current.value, type: "notes", value: ""}]);
    } else if (selectedType === "links") {
      setNewLinks([...newLinks, { label: inputRef.current.value, type: "links", value: ""}]);
    } else if (selectedType === "file") {
      setNewAttachments([...newAttachments, {label: inputRef.current.value, type: "file", value: ""}])
    }

    setToggle(false);
    inputRef.current.value = "";
  }

  // Update a new object if it gets changed
  const handleChangeNewField = (updatedObject, index, fieldType) => {
    if (fieldType === "notes") {
      const updatedNewNotes = [...newNotes];
      updatedNewNotes[index] = updatedObject;
      setNewNotes(updatedNewNotes);      
    } else if (fieldType === "links") {
      const updatedNewLinks = [...newLinks];
      updatedNewLinks[index] = updatedObject;
      setNewLinks(updatedNewLinks);
    } else if (fieldType === "attachments") {
      const updatedNewAttachments = [...newAttachments];
      updatedNewAttachments[index] = updatedObject;
      setNewAttachments(updatedNewAttachments);
    }
  }

  // Delete a new object if it gets changed
  const handleDeleteNewField = (index, fieldType) => {
    if (fieldType === "notes") {
      const updatedNewNotes = [...newNotes];
      updatedNewNotes.splice(index, 1);
      setNewNotes(updatedNewNotes);
    } else if (fieldType === "links") {
      const updatedNewLinks = [...newLinks];
      updatedNewLinks.splice(index, 1);
      setNewLinks(updatedNewLinks);
    } else if (fieldType === "attachments") {
      const updatedNewAttachments = [...newAttachments];
      updatedNewAttachments.splice(index, 1);
      setNewAttachments(updatedNewAttachments);
    }
  }

  // Gets MIME type for any attachments, making them readable in the updateForm
  const getExtension = (content) => {
    const mimeType = content.split(';')[0].split(':')[1];
    const extension = mimeType.split('/')[1];
    return extension;
  }

  // Submit updated form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const notesData = formData.notes.map((note) => ({
        noteId: note.id, 
        updatedNoteContent: note.content,
      }));

      const linksData = formData.links.map((link) => ({
        linkId: link.id,
        updatedLinkContent: link.url,
      }));

      const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          topicId: id,
          topicName: formData.topicName,
          description: formData.description,
          notesData: formData.notes,
          newNotes: newNotes,
          notesToDelete: deletedNotes.map((note) => note.id),
          linksData: formData.links,
          newLinks: newLinks,
          linksToDelete: deletedLinks.map((link) => link.id),
          newAttachments: newAttachments,
          attachmentsToDelete: deletedAttachments.map((attachment) => attachment.id),
          label: "label",
        }),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
          draggable: true,
        });

        const data = await response.json();
        setTimeout(() => {
          window.location.reload();
      }, 3000);

      } else {
        toast.error('Error submitting form.', {
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

          <button type="button" onClick={() => handleDeleteNote(index)}>
            Delete Note
          </button>
        </div>
      ))}

       {/* Input fields for attachments */}
       {formData.attachments.map((attachment, index) => (
          <div key={index}>
            <a href={attachment.content} 
               download={`attachment_${index}.${getExtension(attachment.content)}`}
               target="_blank"
               rel="noopener noreferrer">
              Download Attachment
            </a>
            <button type="button" onClick={() => handleDeleteAttachment(index)}>
              Delete Attachment
            </button>
          </div>
        ))}

      {/* Input fields for new notes */}
      {newNotes.map((note, index) => (
            <Input
              key={index}
              objValue={note}
              index={index}
              onChange={(updatedObject) => handleChangeNewField(updatedObject, index, "notes")}
              deleteField={() => handleDeleteNewField(index, "notes")}
            />
          ))}

        {/* Input fields for new links */}
        {newLinks.map((link, index) => (
          <Input
            key={index}
            objValue={link}
            index={index}
            onChange={(updatedObject) => handleChangeNewField(updatedObject, index, "links")}
            deleteField={() => handleDeleteNewField(index, "links")}
          />
        ))}

        {/* input fields for new attachments */}
        {newAttachments.map((attachment, index) => (
        <Input
          key={index}
          objValue={attachment}
          index={index}
          onChange={(updatedObject) => handleChangeNewField(updatedObject, index, "attachments")}
          deleteField={() => handleDeleteNewField(index, "attachments")}
          type="file"
        />
      ))}

      {!toggle ? (
            <div className="center">
                <button className="add-btn" onClick={handleAddField}>
                Add new
                </button>
            </div>
            ) : (
            <div className="dialog-box">
                <input type="text" placeholder="label" ref={inputRef} />
                <select ref={selectRef} id={selectRef}>
                    <option value="notes">Notes</option>
                    <option value="links">Links</option>
                    <option value="file">File Input</option>
                </select>
                <button className="add-btn" onClick={handleAdd}>
                Add
                </button>
            </div>
          )}
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
}