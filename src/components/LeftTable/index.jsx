import React, { useState } from "react";
import classNames from "classnames";
import Storage from "./components/Storage";
import ProductionAndAssembly from "./components/ProductionAndAssembly";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import productionAssemblyLogo from "../../assets/productionAssemblyIcon.svg";
import storageLogo from "../../assets/storageIcon.svg";

import "./style.scss";

function LeftTable() {
  const [activeTab, setActiveTab] = useState("storage");
  const [open, setOpen] = useState(false);

  return (
    <div
      className={classNames(
        "left-table",
        open ? "left-table--open" : undefined
      )}
    >
      <div className="left-table__header" onClick={() => setOpen(true)}>
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
      <div className="left-table__close-icon" onClick={() => setOpen(false)}>
        <ExpandCircleDownIcon fontSize="large" />
      </div>
    </div>
  );
}

export default LeftTable;
