import React from "react";

import doc from "../../../../assets/guide/doc.pdf";

import "./style.scss";

function GameGuide() {
  return (
    <div className="game-guide">
      <iframe src={doc} frameborder="0"></iframe>
    </div>
  );
}

export default GameGuide;
