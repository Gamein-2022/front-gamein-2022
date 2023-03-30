import classNames from "classnames";
import React, { useState } from "react";
import OffersSent from "../OffersSent";
import OffersRecieved from "../Orders";
import "./style.scss";

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
          پیشنهاد‌های فرستاده‌شده
        </div>
        <div
          className={classNames("offers__header-item", {
            "offers__header-item--active": activeTab === "recieved",
          })}
          onClick={() => setActiveTab("recieved")}
        >
          سفارش‌ها
        </div>
      </div>
      {activeTab === "sent" && <OffersSent />}
      {activeTab === "recieved" && <OffersRecieved />}
    </div>
  );
}

export default Deals;
