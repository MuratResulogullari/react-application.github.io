import React from "react";

const FileInput = ({ id, name, label, alt, isMultiple, onChange, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label" >{label}</label>
            <input id={id} name={name} multiple={isMultiple} onChange={onChange} alt={alt} className="form-control" type="file" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}
export default FileInput;