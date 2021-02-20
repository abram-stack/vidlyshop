import React, { Component } from 'react';

const Input = ({ name, label, value, error, onChange }) => {
  return (  
    <div className="form-group">
      <label htmlFor={name}>
        { label }
      </label>
      <input
        autoFocus
        name={name}
        value={value}
        onChange={onChange}
        id={name} type="text"
        className="form-control"
      />
      {/* if error is truthy then execute */}
      { error && <div className="alert alert-danger">{ error }</div>}
    </div>
  );
}
 
export default Input ;