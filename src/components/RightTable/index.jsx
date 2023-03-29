import React, { useState } from "react";
import tradeLogo from "../../assets/trade.svg";
import transactionsLogo from "../../assets/transactions.svg";
import shopLogo from "../../assets/shop.svg";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import "./style.scss";
import classNames from "classnames";
import Trade from "./components/Trade";
import Shop from "./components/Shop";
import Orders from "./components/Orders";

function RightTable() {
  const [activeTab, setActiveTab] = useState("trade");
  const [open, setOpen] = useState(false);

  return (
    <div
      className={classNames(
        "right-table",
        open ? "right-table--open" : undefined
      )}
    >
      <div className="right-table__header" onClick={() => setOpen(true)}>
        <div
          className={classNames("right-table__header-item", {
            "right-table__header-item--active": activeTab === "trade",
          })}
          onClick={() => setActiveTab("trade")}
        >
          <img className="right-table__logo" src={tradeLogo} alt="trade" />
          تجارت
        </div>
        <div
          className={classNames("right-table__header-item", {
            "right-table__header-item--active": activeTab === "shop",
          })}
          onClick={() => setActiveTab("shop")}
        >
          <img className="right-table__logo" src={shopLogo} alt="shop" />
          فروشگاه گیمین
        </div>
        <div
          className={classNames("right-table__header-item", {
            "right-table__header-item--active": activeTab === "orders",
          })}
          onClick={() => setActiveTab("orders")}
        >
          <img
            className="right-table__logo"
            src={transactionsLogo}
            alt="orders"
          />
          سفارش‌ها
        </div>
      </div>
      <div className="right-table__body">
        {activeTab === "trade" && <Trade />}
        {activeTab === "shop" && <Shop />}
        {activeTab === "orders" && <Orders />}
      </div>
      <div className="left-table__close-icon" onClick={() => setOpen(false)}>
        <ExpandCircleDownIcon fontSize="large" />
      </div>
    </div>
  );
}

export default RightTable;
