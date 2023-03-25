import React from "react";
import sampleImg from "../../../../assets/icons/copper.png";
import OrderCard from "../OrderCard";
import "./style.scss";

const ORDERS = [
  {
    state: "فروخته شده",
    count: 1000,
    unitPrice: 1234,
    name: "copper",
    image: sampleImg,
    color: "success",
  },
  {
    state: "در انتظار خریدار",
    count: 1000,
    unitPrice: 1234,
    name: "copper",
    image: sampleImg,
    color: "warning",
  },
];

function OrdersSell({ orders }) {
  return (
    <div className="orders-sell">
      {orders.map((order) => (
        <OrderCard {...order} />
      ))}
    </div>
  );
}

export default OrdersSell;
