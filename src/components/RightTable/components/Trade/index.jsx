import classNames from "classnames";
import React, { useState } from "react";
import TradeIntermediate from "../TradeIntermediate";
import TradeFinal from "../TradeFinal";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
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
<Trans> محصولات میانی
</Trans>        </div>
        <div
          className={classNames("trade__header-item", {
            "trade__header-item--active": activeTab === "final",
          })}
          onClick={() => setActiveTab("final")}
        >
          <Trans>محصولات نهایی</Trans>
        </div>
      </div>
      {activeTab === "intermediate" && <TradeIntermediate />}
      {activeTab === "final" && <TradeFinal />}
    </div>
  );
}

export default Trade;
