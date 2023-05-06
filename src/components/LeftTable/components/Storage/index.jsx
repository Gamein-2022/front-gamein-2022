import React, { useState } from "react";
import classNames from "classnames";
import "./style.scss";
import InStorage from "../InStorage";
import InQueue from "../InQueue";
import InRoute from "../InRoute";

function Storage({ updateBuildings }) {
  const [activeTab, setActiveTab] = useState("in-storage");

  return (
    <div className="storage">
      <div className="storage__header">
        <div
          className={classNames("storage__header-item", {
            "storage__header-item--active": activeTab === "in-storage",
          })}
          onClick={() => setActiveTab("in-storage")}
        >
          موجودی
        </div>
        <div
          className={classNames("storage__header-item", {
            "storage__header-item--active": activeTab === "in-queue",
          })}
          onClick={() => setActiveTab("in-queue")}
        >
          صف انبار
        </div>
        <div
          className={classNames("storage__header-item", {
            "storage__header-item--active": activeTab === "in-route",
          })}
          onClick={() => setActiveTab("in-route")}
        >
          در مسیر
        </div>
      </div>
      {activeTab === "in-storage" && (
        <InStorage updateBuildings={updateBuildings} />
      )}
      {activeTab === "in-queue" && <InQueue />}
      {activeTab === "in-route" && <InRoute />}
    </div>
  );
}

export default Storage;
