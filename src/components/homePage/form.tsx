'use client'
import { useState, useRef } from "react";
import Input from "./input";
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
    const [formValues, setFormValues] = useState<FormValue[]>([]);
    const [toggle, setToggle] = useState(false);

    const inputRef = useRef();
    const selectRef = useRef();

    const handleChange = (e, index) => {
        const values = [...formValues];
        values[index].value = e.target.value;
        setFormValues(values);
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
              label: 'Label',
            })
          })

          // Toast Pop-up notification
          toast.success('Form submitted successfully!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });

          // Reset Form
          setFormValues([]);


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
                  <input type="text" placeholder="Title:" name="topicName" id="title" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="description">Description: </label>
                  <input type="text" placeholder="Title:" name="description" id="description" required/>
                </div>

                {formValues.map((obj, index) => (
                    <Input 
                        key={index}
                        objValue={obj}
                        onChange={handleChange}
                        index={index}
                        deleteField={handleDeleteField}
                    />
                ))}
                {!toggle ? (
                    <div className="center">
                        <button className="add-btn" onClick={addBtnClick}>
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
                        <button className="add-btn" onClick={handleAddField}>
                        Add
                        </button>
                    </div>
                    )}

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}