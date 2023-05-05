import classNames from "classnames";
import { useState } from "react";
import Helmet from "react-helmet";
import { useRecoilValue } from "recoil";
import { infoState } from "../../store/team-info";
import MyPerformance from "./components/MyPerformance";
import Transactions from "./components/Transactions";
import RegionsMap from "./components/RegionsMap";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
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
        <title>{t`داشبورد`}</title>
      </Helmet>
      <div className="dashboard">
        <div className="dashboard__right">
          <div className="dashboard__right-top">
            <div className="dashboard__right-top-header"><Trans>داشبورد</Trans></div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === DASHBOARD_TABS.transctions,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.transctions)}
              style={{ zIndex: 3 }}
            >
<Trans>
تراکنش‌ها
  </Trans>            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === DASHBOARD_TABS.myPerformance,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.myPerformance)}
              style={{ zIndex: 2 }}
            >
              <Trans>عملکرد تیم</Trans>
            </div>
            <div
              className={classNames("dashboard__right-top-item", {
                "dashboard__right-top-item--active":
                  activeTab === DASHBOARD_TABS.regionsMap,
              })}
              onClick={() => setActiveTab(DASHBOARD_TABS.regionsMap)}
              style={{ zIndex: 1 }}
            >
              <Trans>نقشه منطقه‌ها</Trans>
            </div>
          </div>
          <div className="dashboard__right-bottom">
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
                <Trans>اسم تیم شما:</Trans>
              </div>
              <div className="dashboard__right-bottom-item-value">
                {teamInfo?.teamName || ""}
              </div>
            </div>
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
               <Trans> منطقه شما:</Trans>
              </div>
              <div className="dashboard__right-bottom-item-value">
                <Trans>منطقه </Trans>{teamInfo?.region}
              </div>
            </div>
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
                <Trans>شماره شما:</Trans>
              </div>
              <div className="dashboard__right-bottom-item-value">
                {teamInfo?.phone}
              </div>
            </div>
            <div className="dashboard__right-bottom-item">
              <div className="dashboard__right-bottom-item-title">
                <Trans>ایمیل شما:</Trans>
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
