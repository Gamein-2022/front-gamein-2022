import classNames from "classnames";
import React, { useState } from "react";
import "./style.scss";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import newsLogo from "../../assets/news.svg";
import announcementLogo from "../../assets/announcement.svg";

function MiddleTable() {
  const [activeTab, setActiveTab] = useState("storage");
  const [open, setOpen] = useState(false);

  return (
    <div
      className={classNames(
        "middle-table",
        open ? "middle-table--open" : undefined
      )}
    >
      <div className="middle-table__header" onClick={() => setOpen(true)}>
        <div
          className={classNames("middle-table__header-item", {
            "middle-table__header-item--active": activeTab === "production",
          })}
          onClick={() => setActiveTab("production")}
        >
          <img className="middle-table__logo" src={newsLogo} alt="production" />
          اخبار
        </div>
        <div
          className={classNames("middle-table__header-item", {
            "middle-table__header-item--active": activeTab === "storage",
          })}
          onClick={() => setActiveTab("storage")}
        >
          <img className="middle-table__logo" src={announcementLogo} alt="storage" />
          اطلاعیه‌ها
        </div>
      </div>
      <div className="middle-table__body">
        {activeTab === "storage" && <div></div>}
        {activeTab === "production" && <div></div>}
      </div>
      <div className="middle-table__close-icon" onClick={() => setOpen(false)}>
        <ExpandCircleDownIcon fontSize="large" />
      </div>
    </div>
  );
}

export default MiddleTable;
