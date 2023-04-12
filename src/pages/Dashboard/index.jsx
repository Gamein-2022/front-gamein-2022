import classNames from "classnames";
import { useState } from "react";
import Helmet from "react-helmet";
import "./style.scss";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("production-history");
  return (
    <>
      <Helmet>
        <title>داشبورد</title>
      </Helmet>
      <div className="dashboard">
        <div className="dashboard__right">
          <div className="dashboard__right-top">
            <div className="dashboard__right-top-header">داشبورد</div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === "production-history",
              })}
              onClick={() => setActiveTab("production-history")}
              style={{ zIndex: 4 }}
            >
              تاریخچه تولید و مونتاژ
            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === "trade-history",
              })}
              onClick={() => setActiveTab("trade-history")}
              style={{ zIndex: 3 }}
            >
              تاریخچه خرید و فروش کالا
            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === "my-performance",
              })}
              onClick={() => setActiveTab("my-performance")}
              style={{ zIndex: 2 }}
            >
              عملکرد تیم
            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === "other-performance",
              })}
              onClick={() => setActiveTab("other-performance")}
              style={{ zIndex: 1 }}
            >
              عملکرد بقیه تیما!
            </div>
          </div>
          <div className="dashboard__right-bottom">sdfsdf</div>
        </div>
        <div className="dashboard__left"></div>
      </div>
    </>
  );
}

export default Dashboard;
