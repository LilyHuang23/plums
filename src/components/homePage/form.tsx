'use client'
import { useState, useRef } from "react";
import Input from "./input";

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

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(
          formValues.map((val) => {
            return { [val.label]: val.value };
          })
        );
      };

    return (
        <div className="form_body bg-wisteria">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                  <label htmlFor="title">Title: </label>
                  <input type="text" placeholder="Title:" name="title" id="title"/>
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