import React from "react";
import tradeLogo from "../../assets/trade.svg";
import transactionsLogo from "../../assets/transactions.svg";
import shopLogo from "../../assets/shop.svg";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import "./style.scss";
import classNames from "classnames";
import Trade from "./components/Trade";
import Shop from "./components/Shop";
import Deals from "./components/Deals";
import { useRecoilState } from "recoil";
import { rightTableOpen, rightTableTab } from "../../store/tabs";
import { RIGHT_TABLE_TABS } from "../../constants/tabs";

function RightTable() {
  const [tab, setTab] = useRecoilState(rightTableTab);
  const [open, setOpen] = useRecoilState(rightTableOpen);

  const closeRightTable = () => {
    setOpen(false);
  };

  const openRightTable = () => {
    setOpen(true);
  };

  return (
    <div
      className={classNames(
        "right-table",
        open ? "right-table--open" : undefined
      )}
    >
      <div className="right-table__header" onClick={openRightTable}>
        <div
          className={classNames("right-table__header-item", {
            "right-table__header-item--active": tab === RIGHT_TABLE_TABS.shop,
          })}
          onClick={(e) => {
            if (tab === RIGHT_TABLE_TABS.shop && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(RIGHT_TABLE_TABS.shop);
            }
          }}
        >
          <img className="right-table__logo" src={shopLogo} alt="shop" />
          فروشگاه گیمین
        </div>
        <div
          className={classNames("right-table__header-item", {
            "right-table__header-item--active": tab === RIGHT_TABLE_TABS.trade,
          })}
          onClick={(e) => {
            if (tab === RIGHT_TABLE_TABS.trade && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(RIGHT_TABLE_TABS.trade);
            }
          }}
        >
          <img className="right-table__logo" src={tradeLogo} alt="trade" />
          تجارت
        </div>
        <div
          className={classNames("right-table__header-item", {
            "right-table__header-item--active": tab === RIGHT_TABLE_TABS.deals,
          })}
          onClick={(e) => {
            if (tab === RIGHT_TABLE_TABS.deals && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(RIGHT_TABLE_TABS.deals);
            }
          }}
        >
          <img
            className="right-table__logo"
            src={transactionsLogo}
            alt="orders"
          />
          معاملات
        </div>
      </div>
      <div className="right-table__body">
        {tab === RIGHT_TABLE_TABS.trade && <Trade />}
        {tab === RIGHT_TABLE_TABS.shop && <Shop />}
        {tab === RIGHT_TABLE_TABS.deals && <Deals />}
      </div>
      <div className="left-table__close-icon" onClick={closeRightTable}>
        <ExpandCircleDownIcon fontSize="large" />
      </div>
    </div>
  );
}

export default RightTable;
