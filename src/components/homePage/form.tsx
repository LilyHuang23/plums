'use client'
import { useState, useRef } from "react";
import Input from "./input";
import axios from "axios";

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
        console.log("Test 3 {inside Form submit}")
        console.log(e.target.topicName.value);
        console.log(e.target.description.value);
        try {
          const notes = formValues
            .filter((val) => val && val.type === 'Notes' && val.value !== undefined) // Add checks here
            .map((val) => val.value);

          const links = formValues
            .filter((val) => val && val.type === 'Links' && val.value !== undefined) // Add checks here
            .map((val) => val.value);

          const formData = {
            userId: '65500c864a0bbd2a2777f725', // Replace 'userId' with actual userId
            topicName: e.target.topicName.value,
            description: e.target.description.value,
            notes,
            links,
            label: 'yourLabel',
        };
          const response = await axios.post('http://localhost:3000/api/topics', formData); // Change link once deployed
          console.log(response);
        } catch (error) {
          console.error('Error creating topic:', error);
        }
      };

    return (
        <div className="form_body bg-wisteria">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                  <label htmlFor="title">Topic Name: </label>
                  <input type="text" placeholder="Title:" name="topicName" id="title"/>
                </div>

                <div className="input-group">
                  <label htmlFor="description">Description: </label>
                  <input type="text" placeholder="Title:" name="description" id="description"/>
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
                            <option value="text">Notes</option>
                            <option value="text">Links</option>
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