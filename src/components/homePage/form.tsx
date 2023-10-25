'use client'
import { useState } from "react";

// https://www.telerik.com/blogs/how-to-programmatically-add-input-fields-react-forms
// https://codepen.io/arefeh_htmi/pen/mdPYZKJ?editors=1100

export default function Form()
{
    const [ formValues, setFormValues ] = useState({});
    
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }

    return (
        <div className="home-form">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formValues.title || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="topic-description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={formValues.description || ""}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}