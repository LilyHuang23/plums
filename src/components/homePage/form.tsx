'use client'
import { useState, useRef } from "react";
import Input from "./input";
import { document } from "postcss";

// https://www.telerik.com/blogs/how-to-programmatically-add-input-fields-react-forms
// https://codepen.io/arefeh_htmi/pen/mdPYZKJ?editors=1100

interface FormValue {
  label: string;
  type: string;
  value: string;
}

export default function Form() {
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
    // console.log(e);
    // console.log(
    //   formValues.map((val) => {
    //     return { [val.label]: val.value };
    //   })
    // );
    // Create a new array to store updated form values
    const updatedFormValues = [];

    // Iterate through formValues to handle file conversion
    for (const val of formValues) {
      if (val.type === 'file' && val.value) {
        // If the type is 'file' and a file is selected
        const file = val.value;

        // Convert file to Base64
        const base64 = await convertFileToBase64(file);

        // Store the Base64 value in the updatedFormValues array
        updatedFormValues.push({ ...val, value: base64 });
      } else {
        // For other types of form fields, keep the values as they are
        updatedFormValues.push(val);
      }
    }

    // Log or perform actions with updatedFormValues
    console.log(updatedFormValues);

    // Here you can proceed with sending the form data
  };

  // Function to convert file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="form_body bg-wisteria">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
        <label htmlFor="title">Topic Name: </label>
          <input type="text" placeholder="Topic Name:" name="topic" id="topic" />
          <label htmlFor="title">Title: </label>
          <input type="text" placeholder="Title:" name="title" id="title" />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description: </label>
          <input type="text" placeholder="Title:" />
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