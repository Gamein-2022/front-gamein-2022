import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { getStorageInfo } from "../../../../apis/storage";
import "./style.scss";

function Storage() {
  const [activeTab, setActiveTab] = useState("in-storage");
  const [storageInfo, setStorageInfo] = useState([]);

  useEffect(() => {
    getStorageInfo()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setStorageInfo(data?.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      {/* {activeTab === "intermediate" && <TradeIntermediate />} */}
      {/* {activeTab === "final" && <TradeFinal />} */}
    </div>
  );
}

export default Storage;
