import classNames from "classnames";
import { useState } from "react";
import Helmet from "react-helmet";
import { useRecoilValue } from "recoil";
import { infoState } from "../../store/team-info";
import MyPerformance from "./components/MyPerformance";
import RegionsMap from "./components/RegionsMap";
import ProductionHistory from "./components/ProductionHistory";
import TradeHistory from "./components/TradeHistory";
import "./style.scss";

const DASHBOARD_TABS = {
  productionHistory: "production-history",
  tradeHistory: "trade-history",
  myPerformance: "my-performance",
  regionsMap: "regions-map",
};
function Dashboard() {
  const [activeTab, setActiveTab] = useState("production-history");
  const teamInfo = useRecoilValue(infoState);
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
                  activeTab === DASHBOARD_TABS.regionsMap,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.regionsMap)}
              style={{ zIndex: 1 }}
            >
              نقشه منطقه‌ها
            </div>
          </div>
          <div className="dashboard__right-bottom">
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
                اسم تیم شما:
              </div>
              <div className="dashboard__right-bottom-item-value">
                {teamInfo?.teamName || ""}
              </div>
            </div>
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
                منطقه شما:
              </div>
              <div className="dashboard__right-bottom-item-value">
                منطقه {teamInfo?.region}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__left">
          {activeTab === DASHBOARD_TABS.productionHistory && (
            <ProductionHistory />
          )}
          {activeTab === DASHBOARD_TABS.tradeHistory && <TradeHistory />}
          {activeTab === DASHBOARD_TABS.myPerformance && <MyPerformance />}
          {activeTab === DASHBOARD_TABS.regionsMap && <RegionsMap />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
