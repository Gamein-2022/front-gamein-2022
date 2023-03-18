import classNames from "classnames";
import React, { useState } from "react";
import OrdersBuy from "../OrdersBuy";
import OrdersSell from "../OrdersSell";
import "./style.scss";

function Orders() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="orders">
      <div className="orders__header">
        <div
          className={classNames("orders__header-item", {
            "orders__header-item--active": activeTab === "buy",
          })}
          onClick={() => setActiveTab("buy")}
        >
          سفارش‌های خرید
        </div>
        <div
          className={classNames("orders__header-item", {
            "orders__header-item--active": activeTab === "sell",
          })}
          onClick={() => setActiveTab("sell")}
        >
          سفارش‌های فروش
        </div>
      </div>
      {activeTab === "buy" && <OrdersBuy />}
      {activeTab === "sell" && <OrdersSell />}
    </div>
  );
}

export default Orders;
