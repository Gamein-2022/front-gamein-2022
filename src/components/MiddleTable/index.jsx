import classNames from "classnames";
import React, { useState } from "react";
import "./style.scss";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import newsLogo from "../../assets/news.svg";
import announcementLogo from "../../assets/announcement.svg";
import News from "./components/News";
import Announcments from "./components/Announcments";

function MiddleTable() {
  const [activeTab, setActiveTab] = useState("news");
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
            "middle-table__header-item--active": activeTab === "news",
          })}
          onClick={() => setActiveTab("news")}
        >
          <img className="middle-table__logo" src={newsLogo} alt="news" />
          اخبار
        </div>
        <div
          className={classNames("middle-table__header-item", {
            "middle-table__header-item--active": activeTab === "announcments",
          })}
          onClick={() => setActiveTab("announcments")}
        >
          <img
            className="middle-table__logo"
            src={announcementLogo}
            alt="announcments"
          />
          اطلاعیه‌ها
        </div>
      </div>
      <div className="middle-table__body">
        {activeTab === "news" && <News />}
        {activeTab === "announcments" && <Announcments />}
      </div>
      <div className="middle-table__close-icon" onClick={() => setOpen(false)}>
        <ExpandCircleDownIcon fontSize="large" />
      </div>
    </div>
  );
}

export default MiddleTable;
