import classNames from "classnames";
import React, { useState } from "react";
import ShopBuildings from "../ShopBuildings";
import TradeIntermediate from "../TradeIntermediate";
import TradeFinal from "../TradeFinal";
import "./style.scss";

function Trade() {
  const [activeTab, setActiveTab] = useState("intermediate");

  return (
    <div className="trade">
      <div className="trade__header">
        <div
          className={classNames("trade__header-item", {
            "trade__header-item--active": activeTab === "intermediate",
          })}
          onClick={() => setActiveTab("intermediate")}
        >
          محصولات میانی
        </div>
        <div
          className={classNames("trade__header-item", {
            "trade__header-item--active": activeTab === "final",
          })}
          onClick={() => setActiveTab("final")}
        >
          محصولات نهایی
        </div>
      </div>
      {activeTab === "intermediate" && <TradeIntermediate />}
      {activeTab === "final" && <TradeFinal />}
    </div>
  );
}

export default Trade;
