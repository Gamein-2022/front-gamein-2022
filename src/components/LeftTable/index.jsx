import React, { useState } from "react";
import classNames from "classnames";
import Storage from "./components/Storage";
import ProductionAndAssembly from "./components/ProductionAndAssembly";

import productionAssemblyLogo from "../../assets/productionAssemblyIcon.svg";
import storageLogo from "../../assets/storageIcon.svg";

import "./style.scss";

function LeftTable() {
  const [activeTab, setActiveTab] = useState("storage");

  return (
    <div className="left-table">
      <div className="left-table__header">
        <div
          className={classNames("left-table__header-item", {
            "left-table__header-item--active": activeTab === "production",
          })}
          onClick={() => setActiveTab("production")}
        >
          <img
            className="left-table__logo"
            src={productionAssemblyLogo}
            alt="production"
          />
          تولید و مونتاژ
        </div>
        <div
          className={classNames("left-table__header-item", {
            "left-table__header-item--active": activeTab === "storage",
          })}
          onClick={() => setActiveTab("storage")}
        >
          <img className="left-table__logo" src={storageLogo} alt="storage" />
          مدیریت انبار
        </div>
      </div>
      <div className="left-table__body">
        {activeTab === "storage" && <Storage />}
        {activeTab === "production" && <ProductionAndAssembly />}
      </div>
    </div>
  );
}

export default LeftTable;
