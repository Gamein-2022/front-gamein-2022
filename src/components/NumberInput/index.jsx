import classNames from "classnames";
import React from "react";
import "./style.scss";
import Button from "../Button";

function NumberInput({
  label,
  value,
  step = 1,
  onChange,
  wrapperClassName,
  ...otherprops
}) {
  const add = () => {
    onChange(value + step)
  }

  const sub = () => {
    if (value > step)
      onChange(value - step)
  }

  const handleChange = (e) => {
    const next = +e.target.value;
    onChange(next);
  }

  return (
    <div className={classNames("number-input", wrapperClassName)}>
      {label && <div className="number-input__label">{label}</div>}
      <div className="number-input__body">
        <input
          className={classNames("number-input__input", value % step == 0 ? "" : "number-input__invalid")}
          type="number"
          step={step}
          value={value == 0 ? null : value}
          onChange={handleChange}
          {...otherprops}
        />
        <div className="number-input__addsub">
          <Button className="number-input__addsub-button number-input__add-button" onClick={add}>{step} +</Button>
          <Button type="error" className="number-input__addsub-button number-input__sub-button" onClick={sub}>{step} -</Button>
        </div>
      </div>
    </div>
  );
}

export default NumberInput;
