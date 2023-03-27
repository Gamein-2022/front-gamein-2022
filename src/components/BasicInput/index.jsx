import classNames from "classnames";
import React from "react";
import "./style.scss";

function BasicInput({
  label,
  value,
  onChange,
  wrapperClassName,
  ...otherprops
}) {
  return (
    <div className={classNames("basic-input", wrapperClassName)}>
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
