import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getOrdersHistory } from "../../../../apis/orders";
import OrdersBuy from "../OrdersBuy";
import OrdersSell from "../OrdersSell";
import "./style.scss";

function Orders() {
  const [activeTab, setActiveTab] = useState("buy");
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);

  useEffect(() => {
    getOrdersHistory()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setBuyOrders(
          data.result.filter(
            (item) => !item.cancelled && item.orderType === "BUY"
          )
        );
        setSellOrders(
          data.result.filter(
            (item) => !item.cancelled && item.orderType === "SELL"
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      {activeTab === "buy" && <OrdersBuy orders={buyOrders} />}
      {activeTab === "sell" && <OrdersSell orders={sellOrders} />}
    </div>
  );
}

export default Orders;
