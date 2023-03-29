import classNames from "classnames";
import React, { useState } from "react";
import ShopBuildings from "../ShopBuildings";
import ShopInitial from "../ShopInitial";
import "./style.scss";

function Shop() {
  const [activeTab, setActiveTab] = useState("initial");

  return (
    <div className="shop">
      <div className="shop__header">
        <div
          className={classNames("shop__header-item", {
            "shop__header-item--active": activeTab === "initial",
          })}
          onClick={() => setActiveTab("initial")}
        >
          مواد اولیه
        </div>
        <div
          className={classNames("shop__header-item", {
            "shop__header-item--active": activeTab === "buildings",
          })}
          onClick={() => setActiveTab("buildings")}
        >
          ساختمان‌ها
        </div>
      </div>
      {activeTab === "initial" && <ShopInitial />}
      {activeTab === "buildings" && <ShopBuildings />}
    </div>
  );
}

export default Shop;
