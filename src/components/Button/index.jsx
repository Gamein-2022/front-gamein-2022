import React from "react";
import classNames from "classnames";
import "./style.scss";

function Button({ onClick, type, className, children, ...otherProps }) {
  return (
    <button
      onClick={onClick}
      className={classNames("button", `button--${type}`, className)}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
