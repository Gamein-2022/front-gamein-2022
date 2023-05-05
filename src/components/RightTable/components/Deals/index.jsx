import classNames from "classnames";
import React, { useState } from "react";
import OffersSent from "../OffersSent";
import Orders from "../Orders";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro";
function Deals() {
  const [activeTab, setActiveTab] = useState("recieved");

  return (
    <div className="offers">
      <div className="offers__header">
        <div
          className={classNames("offers__header-item", {
            "offers__header-item--active": activeTab === "sent",
          })}
          onClick={() => setActiveTab("sent")}
        >
          <Trans>پیشنهاد‌های فرستاده‌شده</Trans>
        </div>
        <div
          className={classNames("offers__header-item", {
            "offers__header-item--active": activeTab === "recieved",
          })}
          onClick={() => setActiveTab("recieved")}
        >
         <Trans> سفارش‌ها</Trans>
        </div>
      </div>
      {activeTab === "sent" && <OffersSent />}
      {activeTab === "recieved" && <Orders />}
    </div>
  );
}

export default Deals;
