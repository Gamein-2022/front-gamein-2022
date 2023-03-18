import React, { useState } from "react";
import tradeLogo from "../../assets/trade.svg";
import transactionsLogo from "../../assets/transactions.svg";
import shopLogo from "../../assets/shop.svg";

import "./style.scss";
import classNames from "classnames";
import Trade from "./components/Trade";
import Shop from "./components/Shop";
import Orders from "./components/Orders";

function TradeTable() {
  const [activeTab, setActiveTab] = useState("trade");

  return (
    <div className="trade-table">
      <div className="trade-table__header">
        <div
          className={classNames("trade-table__header-item", {
            "trade-table__header-item--active": activeTab === "trade",
          })}
          onClick={() => setActiveTab("trade")}
        >
          <img className="trade-table__logo" src={tradeLogo} alt="trade" />
          تجارت
        </div>
        <div
          className={classNames("trade-table__header-item", {
            "trade-table__header-item--active": activeTab === "shop",
          })}
          onClick={() => setActiveTab("shop")}
        >
          <img className="trade-table__logo" src={shopLogo} alt="shop" />
          فروشگاه گیمین
        </div>
        <div
          className={classNames("trade-table__header-item", {
            "trade-table__header-item--active": activeTab === "orders",
          })}
          onClick={() => setActiveTab("orders")}
        >
          <img
            className="trade-table__logo"
            src={transactionsLogo}
            alt="orders"
          />
          سفارش‌ها
        </div>
      </div>
      <div className="trade-table__body">
        {activeTab === "trade" && <Trade />}
        {activeTab === "shop" && <Shop />}
        {activeTab === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default TradeTable;
