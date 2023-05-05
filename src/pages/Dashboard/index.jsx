import classNames from "classnames";
import { useState } from "react";
import Helmet from "react-helmet";
import { useRecoilValue } from "recoil";
import { infoState } from "../../store/team-info";
import MyPerformance from "./components/MyPerformance";
import Transactions from "./components/Transactions";
import RegionsMap from "./components/RegionsMap";
import "./style.scss";

const DASHBOARD_TABS = {
  transctions: "transctions",
  myPerformance: "my-performance",
  regionsMap: "regions-map",
};
function Dashboard() {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.transctions);
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
                  activeTab === DASHBOARD_TABS.transctions,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.transctions)}
              style={{ zIndex: 3 }}
            >
              تراکنش‌ها
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
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
                شماره شما:
              </div>
              <div className="dashboard__right-bottom-item-value">
                {teamInfo?.phone}
              </div>
            </div>
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
                ایمیل شما:
              </div>
              <div className="dashboard__right-bottom-item-value">
                {teamInfo?.email}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__left">
          {activeTab === DASHBOARD_TABS.transctions && <Transactions />}
          {activeTab === DASHBOARD_TABS.myPerformance && <MyPerformance />}
          {activeTab === DASHBOARD_TABS.regionsMap && <RegionsMap />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
