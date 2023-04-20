import React from "react";
import gameinLogo from "../../assets/gamein_logo_color.svg";
import "./style.scss";

function GameinLoading({ size }) {
  return (
    <div className="gamein-loading">
      <img
        style={{ width: size || 64 }}
        className="gamein-loading__img"
        src={gameinLogo}
        alt="gamein logo"
      />
    </div>
  );
}

export default GameinLoading;
