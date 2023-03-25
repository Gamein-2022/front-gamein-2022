import React from "react";
import "./style.scss";

function BasicInput({ label, value, onChange, ...otherprops }) {
  return (
    <div className="basic-input">
      {label && <div className="basic-input__label">{label}</div>}
      <input
        className="basic-input__input"
        value={value}
        onChange={onChange}
        {...otherprops}
      />
    </div>
  );
}

export default BasicInput;
