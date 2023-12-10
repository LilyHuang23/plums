'use client'
import { useState, useRef } from "react";
import Input from "./input";
import AllTopics from "components/allTopics";
import AllTags from "components/tagsPage/allTags";

import { toast } from "react-toastify";


// https://www.telerik.com/blogs/how-to-programmatically-add-input-fields-react-forms
// https://codepen.io/arefeh_htmi/pen/mdPYZKJ?editors=1100

interface FormValue {
    label: string;
    type: string;
    value: string;
  }

export default function Form()
{
//  Set initial form values
    const initialFormState = [];
    const initialToggleState = false;

//  Set up states 
    const [formValues, setFormValues] = useState<FormValue[]>(initialFormState);
    const [toggle, setToggle] = useState(initialToggleState);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const inputRef = useRef();
    const selectRef = useRef();

    const handleChange = (newValue, index) => {
          setFormValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            return updatedValues;
        });
      };

      const handleAddField = (e) => {
        e.preventDefault();
        const values = [...formValues];
        values.push({
          label: inputRef.current?.value || "label",
          type: selectRef.current?.value || "text",
          value: "",
        });
        setFormValues(values);
        setToggle(false);
      };

      const handleDeleteField = (e, index) => {
        const values = [...formValues];
        values.splice(index, 1);
        setFormValues(values);
      }

      const addBtnClick = (e) => {
        e.preventDefault();
        setToggle(true);
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const notes = formValues
            .filter((val) => val && val.type === 'notes')
            .map((val) => val.value);

          const links = formValues
            .filter((val) => val && val.type === 'links')
            .map((val) => val.value);

          const attachments = formValues
            .filter((val) => val && val.type === 'file')
            .map((val) => val.value);

          // Get parent ID, allow it to be null
          const parentTopicSelect = document.querySelector("#parentTopicSelect");
          const parentTopicId = parentTopicSelect.value;
          const parentId = parentTopicId ? parentTopicId : null;

          // Get tag IDs
          const selectedTags = document.querySelectorAll('input[type="checkbox"]:checked');
          const tagNames = Array.from(selectedTags).map((tag) => tag.value);
          const tagIds = tagNames;

          const res = await fetch('http://localhost:3000/api/topics', { // Change link once deployed
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              userId: '65500c864a0bbd2a2777f725', // Replace 'userId' with actual userId
              topicName: e.target.topicName.value,
              description: e.target.description.value,
              notes,
              links,
              attachments,
              label: 'Label',
              parentId,
              tagNames,
              tagIds
            })
          })
          
          // Toast Pop-up notification
          toast.success('Form submitted successfully!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            closeOnClick: true,
            draggable: true,
          });

          setTimeout(() => {
            window.location.reload();
        }, 3000);

        } catch (error) {
          console.error('Error creating topic:', error);

          toast.error('Error submitting form', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });
        }
      };


    return (
        <div className="form_body bg-wisteria">
            <form className="homeForm" onSubmit={handleSubmit}>
              <div className="input-group">
                  <label htmlFor="title">Topic Name: </label>
            <input className="block flex-1 border-1 bg-slate-100 py-1.5 pl-1 rounded text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              type="text" placeholder="Topic Name" name="topicName" id="title" required />
                </div>

                <div className="input-group">
                  <label htmlFor="description">Description: </label>
            <input className="block flex-1 border-1 bg-slate-100 py-1.5 pl-1 rounded text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              type="text" placeholder="Description" name="description" id="description" required />
                </div>

                <AllTopics renderAsSelect />
                <AllTags />

                {formValues.map((obj, index) => (
                  <Input 
                        key={index}
                        objValue={obj}
                        onChange={handleChange}
                        index={index}
                        // deleteField={handleDeleteField}
                    />
                ))}
                
                {!toggle ? (
                    <div className="center">
                        <button className="add-btn rounded" onClick={addBtnClick}>
                        Add new
                        </button>
                    </div>
                    ) : (
                    <div className="dialog-box">
                <input
                  className="block flex-1 border-1 bg-slate-100 py-1.5 pl-1 rounded text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  type="text" placeholder="label" ref={inputRef} />
                <select
                  className="block flex-1 border-1 bg-slate-100 py-1.5 pl-1 rounded text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  ref={selectRef} id={selectRef}>
                            <option value="notes">Notes</option>
                            <option value="links">Links</option>
                            <option value="file">File Input</option>
                        </select>
                        <button className="add-btn rounded" onClick={handleAddField}>
                        Add
                        </button>
                    </div>
                    )}

                <button type="submit" className="submit-btn rounded">Submit</button>
            </form>
        </div>
    )
}