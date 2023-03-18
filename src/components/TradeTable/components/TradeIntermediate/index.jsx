import classNames from "classnames";
import React, { useState } from "react";
import "./style.scss";

function TradeIntermediate() {
  const [activeTab, setActiveTab] = useState("buy");
  return (
    <div className="trade-filter">
      <div className="trade-filter__tabs">
        <div
          onClick={() => setActiveTab("buy")}
          className={classNames("trade-filter__tab trade-filter__tab-buy", {
            "trade-filter__tab-buy--active": activeTab === "sell",
          })}
        >
          خرید
        </div>
        <div
          onClick={() => setActiveTab("sell")}
          className={classNames("trade-filter__tab trade-filter__tab-sell", {
            "trade-filter__tab-sell--active": activeTab === "sell",
          })}
        >
          فروش
        </div>
      </div>
    </div>
  );
}

export default TradeIntermediate;
