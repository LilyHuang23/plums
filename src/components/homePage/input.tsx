import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Input({ objValue, onChange, index, deleteField }) {
    const {label, type, value} = objValue;

    const [base64, setBase64] = useState<any | any>(null);
    const [image, setImage] = useState(""); 

    const convertFileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files && e.target.files[0];
        if (fileInput) {

          // Check to make sure file isn't too large
          if (fileInput.size > 50000000 ) // 50 megabytes in bytes
          {
            toast.error('Max file size is 50MB. Please upload a smaller file.', {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 3000,
              closeOnClick: true,
              draggable: true,
            });

            return;
          }

          // Check to make sure file type is acceptable
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 
                                'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                                'application/pdf', 'text/plain'];

          if (!allowedTypes.includes(fileInput.type)) {
              toast.error('File type not supported.', {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 3000,
              closeOnClick: true,
              draggable: true,
            });
              return;
          }

            const reader = new FileReader();
            reader.readAsDataURL(fileInput);
            reader.onload = () => {
                setImage(fileInput)
                setBase64(reader.result)
                const updatedObject = { label, type, value: reader.result as string }
                onChange(updatedObject, index);                
            }
        }
    }
    if (type === 'file') {
        return (
            <div className="input-group">
                <label htmlFor={label}>{label}</label>
                <div className="input">
                    <input
                        type="file"
                        id={label}
                        onChange={convertFileToBase64} // Call function on file change
                    />
                </div>
                <div>
                    {image && <p>Selected file: {image.name}</p>}
                </div>
                <button className="" onClick={(e) => deleteField(e, index)}>Delete</button>
            </div>
        );
    } else if (type === 'notes' || type === 'links') {
        return (
            <div className="input-group">
                <label htmlFor={label}>{label}</label>
                <div className="input">
                <input type={type} 
                       id={label}
                       value={value || ""} 
                       onChange={(e) => {
                        const updatedObject = { label, type, value: e.target.value };
                        onChange(updatedObject, index);
                    }}
                    />
            </div>
            <button className="" onClick={(e) => deleteField(e, index)}>Delete</button>
        </div>
        );
    }
}

