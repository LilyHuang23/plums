'use client'
import { useState, useRef } from "react";
import Input from "./input";

import { document } from "postcss";
import { FormEvent } from "react";

import { toast } from "react-toastify";


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
    const [base64, setBase64] = useState<any | any>(null);
    const [image, setImage] = useState("");
    const inputRef = useRef();
    const selectRef = useRef();

    const handleChange = (e: any, index: any) => {
        const values = [...formValues];
        values[index].value = e.target.value;
        setFormValues(values);
    };

    const handleAddField = (e: any) => {
        e.preventDefault();
        const values = [...formValues];
        values.push({
            label: inputRef.current!.value || "label",
            type: selectRef.current?.value || "text",
            value: "",
        });
        setFormValues(values);
        setToggle(false);
    };

    //   function setFile64(result: string | ArrayBuffer | null) {
    //     throw new Error("Function not implemented.");
    // }

    const convertFileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("hello")
        const fileInput = e.target.files && e.target.files[0];
        if (fileInput) {
            setImage(fileInput)
            const reader = new FileReader();
            reader.readAsDataURL(fileInput);
            reader.onload = () => {
                setBase64(reader.result)
                console.log(reader.result)
            }
        }
    }


    const handleDeleteField = (e: any, index: any) => {
        const values = [...formValues];
        values.splice(index, 1);
        setFormValues(values);
    }

    const addBtnClick = (e: any) => {
        e.preventDefault();
        setToggle(true);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(base64)
        // Create a new array to store updated form values
        const updatedFormValues = [];

        // Iterate through formValues to handle file conversion
        for (const val of formValues) {
            if (val.type === 'file' && val.value) {
                // If the type is 'file' and a file is selected
                const file = val.value;

                // Convert file to Base64
                // const base64 = await convertFileToBase64(file);

                // Store the Base64 value in the updatedFormValues array
                updatedFormValues.push({ ...val, value: base64 });
            } else {
                // For other types of form fields, keep the values as they are
                updatedFormValues.push(val);
            }
        }

        // Log or perform actions with updatedFormValues
        console.log(updatedFormValues);
        console.log(base64);

        // Here you can proceed with sending the form data
    };

    // Function to convert file to Base64
    //   const convertFileToBase64 = (file: any) => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => resolve(reader.result!.toString().split(',')[1]);
    //       reader.onerror = (error) => reject(error);
    //     });



  }

// export default function Form()
// {
//     const [formValues, setFormValues] = useState<FormValue[]>([]);
//     const [toggle, setToggle] = useState(false);

//     const inputRef = useRef();
//     const selectRef = useRef();

//     const handleChange = (e, index) => {
//         const values = [...formValues];
//         values[index].value = e.target.value;
//         setFormValues(values);
//       };
    
//       const handleAddField = (e) => {
//         e.preventDefault();
//         const values = [...formValues];
//         values.push({
//           label: inputRef.current?.value || "label",
//           type: selectRef.current?.value || "text",
//           value: "",
//         });
//         setFormValues(values);
//         setToggle(false);
//       };

//       const handleDeleteField = (e, index) => {
//         const values = [...formValues];
//         values.splice(index, 1);
//         setFormValues(values);
//       }

//       const addBtnClick = (e) => {
//         e.preventDefault();
//         setToggle(true);
//       }

//       const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//           const notes = formValues
//             .filter((val) => val && val.type === 'notes')
//             .map((val) => val.value);

//           const links = formValues
//             .filter((val) => val && val.type === 'links')
//             .map((val) => val.value);

//           const res = await fetch('http://localhost:3000/api/topics', { // Change link once deployed
//             method: 'POST',
//             headers: {
//               'Content-type': 'application/json',
//             },
//             body: JSON.stringify({
//               userId: '65500c864a0bbd2a2777f725', // Replace 'userId' with actual userId
//               topicName: e.target.topicName.value,
//               description: e.target.description.value,
//               notes,
//               links,
//               label: 'Label',
//             })
//           })

//           // Toast Pop-up notification
//           toast.success('Form submitted successfully!', {
//             position: toast.POSITION.BOTTOM_CENTER,
//             autoClose: 3000,
//             closeOnClick: true,
//             draggable: true,
//           });

//           // Reset Form
//           setFormValues([]);


//         } catch (error) {
//           console.error('Error creating topic:', error);

//           toast.error('Error submitting form', {
//             position: toast.POSITION.BOTTOM_CENTER,
//             autoClose: 3000,
//             closeOnClick: true,
//             draggable: true,
//           });
//         }
//       }; 


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
                <div className="input-group">
                    <label htmlFor="upload">Upload a Picture:
                        <input
                            id="upload"
                            type="file"
                            accept="image/*"
                            placeholder="Upload A Picture:"
                            onChange={convertFileToBase64}
                        />

                    </label>
                </div>
                <div className="input-group">
                    <label htmlFor="upload">Upload a File:
                        <input
                            id="upload"
                            type="file"
                            accept=".doc, .docx"
                            placeholder="Upload A File:"
                            onChange={convertFileToBase64}
                        />

                    </label>
                    </div>
                    <div className="input-group">
                    <label htmlFor="upload">Upload a PDF/ Text File:
                        <input
                            id="upload"
                            type="file"
                            accept=".pdf, .txt"
                            placeholder="Upload a PDF/ Text File:"
                            onChange={convertFileToBase64}
                        />

                    </label>
                </div>

                {/* {formValues.map((obj, index) => (
                    <Input

            <form className="homeForm" onSubmit={handleSubmit}>
              <div className="input-group">
                  <label htmlFor="title">Topic Name: </label>
                  <input type="text" placeholder="Title:" name="topicName" id="title" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="description">Description: </label>
                  <input type="text" placeholder="Title:" name="description" id="description" required/>
                </div> */}

                {/* {formValues.map((obj, index) => (
                    <Input 

                        key={index}
                        objValue={obj}
                        onChange={handleChange}
                        index={index}
                        deleteField={handleDeleteField}
                    /> */}


                    {/* // Make image uploading onChange rather than onSubmit
                    // Set up base64 outside of handle submit

                ))} */}
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
                        <button className="add-btn" onChange={handleAddField}>
                            Add
                        </button>
                    </div>
                )}

{/* <!--                         Add new
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
                    )}--> */}

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )




