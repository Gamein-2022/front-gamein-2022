import React from "react";
import sampleImg from "../../../../assets/icons/copper.png";
import OrderCard from "../OrderCard";
import "./style.scss";

const ORDERS = [
  {
    state: "خریداری شده",
    count: 1000,
    unitPrice: 1234,
    name: "copper",
    image: sampleImg,
    color: "success",
  },
  {
    state: "در انتظار فروشنده",
    count: 1000,
    unitPrice: 1234,
    name: "copper",
    image: sampleImg,
    color: "warning",
  },
];

function OrdersBuy() {
  return (
    <div>
      {ORDERS.map((order) => (
        <OrderCard {...order} />
      ))}
    </div>
  );
}

export default OrdersBuy;
