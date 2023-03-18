import classNames from "classnames";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import "./style.scss";

function OrderCard({ image, state, color, count, unitPrice, name }) {
  return (
    <div
      className={classNames("order-card", {
        "order-card--warning": color === "warning",
      })}
    >
      <div className="order-card__title">
        {color === "warning" ? (
          <AccessTimeIcon fontSize="small" />
        ) : (
          <CheckIcon fontSize="small" />
        )}{" "}
        {state}
      </div>
      <div className="order-card__body">
        <div className="order-card__right">
          <img className="order-card__img" src={image} alt="order card" />
          <div className="order-card__name">{name}</div>
        </div>
        <div className="order-card__left">
          <div className="order-card__count">{count} واحد</div>
          <div className="order-card__unit-price">قیمت واحد: {unitPrice}</div>
          <button className="order-card__action-btn">
            {color === "success" ? "بایگانی" : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
