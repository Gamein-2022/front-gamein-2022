import classNames from "classnames";
import { useEffect, useState } from "react";
import { convertNumericToLexical } from "../../utils/formatters";

import Button from "../Button";

import "./style.scss";

function NumberInput({
  label,
  value,
  step = 1,
  onChange,
  wrapperClassName,
  className: inputClassName,
  setHasError = () => {},
  ...otherprops
}) {
  const [focused, setFocused] = useState(false);
  const [hasErrorState, setHasErrorState] = useState("");
  const add = () => {
    onChange(value + step);
  };

  const sub = () => {
    if (value > step) onChange(value - step);
  };

  const handleChange = (e) => {
    const next = +e.target.value;
    onChange(next);
  };

  useEffect(() => {
    setHasErrorState(value % step !== 0 && focused);
    setHasError(value % step !== 0 && focused);
  }, [value, step, focused]);

  return (
    <div className={classNames("number-input", wrapperClassName)}>
      {label && <div className="number-input__label">{label}</div>}
      <div className="number-input__body">
        <Button
          className="number-input__addsub-button number-input__add-button"
          onClick={add}
        >
          {step} +
        </Button>
        <input
          className={classNames(
            "number-input__input",
            inputClassName,
            value % step !== 0 && focused ? "number-input__invalid" : ""
          )}
          type="number"
          step={step}
          value={value == "0" ? "" : value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          {...otherprops}
        />
        <Button
          type="error"
          className="number-input__addsub-button number-input__sub-button"
          onClick={sub}
        >
          {step} -
        </Button>
      </div>
      <div className="number-input__lexical">{convertNumericToLexical(value)}</div>
      {hasErrorState && (
        <div className="number-input__error">{`عدد واردشده باید مضرب ${step} باشد.`}</div>
      )}
    </div>
  );
}

export default NumberInput;
