import classNames from "classnames";
import { useState } from "react";
import Helmet from "react-helmet";
import MyPerformance from "./components/MyPerformance";
import OtherPerformance from "./components/OtherPerformance";
import ProductionHistory from "./components/ProductionHistory";
import TradeHistory from "./components/TradeHistory";
import "./style.scss";

const DASHBOARD_TABS = {
  productionHistory: "production-history",
  tradeHistory: "trade-history",
  myPerformance: "my-performance",
  otherPerformance: "other-performance",
};
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
                  activeTab === DASHBOARD_TABS.productionHistory,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.productionHistory)}
              style={{ zIndex: 4 }}
            >
              تاریخچه تولید و مونتاژ
            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === DASHBOARD_TABS.tradeHistory,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.tradeHistory)}
              style={{ zIndex: 3 }}
            >
              تاریخچه خرید و فروش کالا
            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === DASHBOARD_TABS.myPerformance,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.myPerformance)}
              style={{ zIndex: 2 }}
            >
              عملکرد تیم
            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === DASHBOARD_TABS.otherPerformance,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.otherPerformance)}
              style={{ zIndex: 1 }}
            >
              عملکرد بقیه تیما!
            </div>
          </div>
          <div className="dashboard__right-bottom"></div>
        </div>
        <div className="dashboard__left">
          {activeTab === DASHBOARD_TABS.productionHistory && (
            <ProductionHistory />
          )}
          {activeTab === DASHBOARD_TABS.tradeHistory && <TradeHistory />}
          {activeTab === DASHBOARD_TABS.myPerformance && <MyPerformance />}
          {activeTab === DASHBOARD_TABS.otherPerformance && (
            <OtherPerformance />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
