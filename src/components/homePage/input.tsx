// import React from "react";

// export default function Input({ objValue, onChange, index, deleteField }) {
//     const {label, type, value} = objValue;

    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <div className="input">
                <input type={type} 
                       id={label}
                       value={value || ""} 
                       onChange={(e) => onChange(e, index)}
                />
            </div>
            <button className="" onClick={(e) => deleteField(e, index)}>Delete</button>
        </div>
    )
}
