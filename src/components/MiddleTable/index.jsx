import React from "react";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import newsLogo from "../../assets/news.svg";
import announcementLogo from "../../assets/announcement.svg";
import News from "./components/News";
import Announcments from "./components/Announcments";
import { MIDDLE_TABLE_TABS } from "../../constants/tabs";
import { middleTableOpen, middleTableTab } from "../../store/tabs";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro";
import "./style.scss";

function MiddleTable() {
  const [tab, setTab] = useRecoilState(middleTableTab);
  const [open, setOpen] = useRecoilState(middleTableOpen);

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
            "middle-table__header-item--active": tab === MIDDLE_TABLE_TABS.news,
          })}
          onClick={(e) => {
            if (tab === MIDDLE_TABLE_TABS.news && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(MIDDLE_TABLE_TABS.news);
            }
          }}
        >
          <img className="middle-table__logo" src={newsLogo} alt="news" />
<Trans>اخبار
</Trans>        </div>
        <div
          className={classNames("middle-table__header-item", {
            "middle-table__header-item--active":
              tab === MIDDLE_TABLE_TABS.announcements,
          })}
          onClick={(e) => {
            if (tab === MIDDLE_TABLE_TABS.announcements && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(MIDDLE_TABLE_TABS.announcements);
            }
          }}
        >
          <img
            className="middle-table__logo"
            src={announcementLogo}
            alt="announcments"
          />
          <Trans>اطلاعیه‌ها</Trans>
        </div>
      </div>
      <div className="middle-table__body">
        {tab === MIDDLE_TABLE_TABS.news && <News />}
        {tab === MIDDLE_TABLE_TABS.announcements && <Announcments />}
      </div>
      <div className="middle-table__close-icon" onClick={() => setOpen(false)}>
        <ExpandCircleDownIcon fontSize="large" />
      </div>
    </div>
  );
}

export default MiddleTable;
