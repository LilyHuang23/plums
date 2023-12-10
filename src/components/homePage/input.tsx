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
            <div className="input-group col-span-full">
                <label htmlFor={label} >{label}</label>
                <div className="input mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10">
                <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor={label} className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 ">
                    
                                <span>Upload a file</span>
                    <input
                        className="sr-only"
                        type="file"
                        id={label}
                        onChange={convertFileToBase64} // Call function on file change
                                />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    </div>
                    
                {/* <div>
                    
                    {image && <p>Selected file: {image.name}</p>}
                </div> */}
                <button className="text-red-400" onClick={(e) => deleteField(e, index)}>Delete</button>

            </div>
        );
    } else if (type === 'notes' || type === 'links') {
        return (
            <div className="input-group">
                <label htmlFor={label}>{label}</label>
                <div className="input">
                    <input
                       className="block flex-1 border-1 bg-slate-100 py-1.5 pl-1 rounded text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        type={type} 
                       id={label}
                       value={value || ""} 
                       onChange={(e) => {
                        const updatedObject = { label, type, value: e.target.value };
                        onChange(updatedObject, index);
                    }}
                    />
            </div>
            <button type="button" className="text-red-400" onClick={(e) => deleteField(e, index)}>Delete</button>
        </div>
        );
    }
}

