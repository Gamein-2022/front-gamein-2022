import React from "react";
import classNames from "classnames";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import sampleImg from "../../../../assets/materials/unkown_material.svg";
import "./style.scss";
import { cancelOrder } from "../../../../apis/orders";
import { toast } from "react-toastify";
import {
  INTERMEDIATE_MATERIALS_LEVEL_ONE,
  INTERMEDIATE_MATERIALS_LEVEL_TWO,
  RAW_MATERIALS,
} from "../../../../constants/materials";
import { formatPrice } from "../../../../utils/formatters";

function OrderCard({
  quantity,
  unitPrice,
  productName,
  acceptDate,
  orderType,
  id,
}) {
  const color = !!acceptDate ? "success" : "warning";
  const state =
    orderType === "BUY"
      ? acceptDate
        ? "خریداری شده"
        : "در انتظار فروشنده"
      : acceptDate
      ? "فروخته شده"
      : "در انتظار خریدار";

  const handleDeleteOrder = () => {
    cancelOrder(id)
      .then((res) => res.data)
      .then((data) => {
        toast.success("سفارش با موفقیت حذف شد.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        )}
        {state}
      </div>
      <div className="order-card__body">
        <div className="order-card__right">
          <img
            className="order-card__img"
            src={
              RAW_MATERIALS[productName]?.icon ||
              INTERMEDIATE_MATERIALS_LEVEL_ONE[productName]?.icon ||
              INTERMEDIATE_MATERIALS_LEVEL_TWO[productName]?.icon ||
              sampleImg
            }
            alt="order card"
          />
          <div className="order-card__name">{productName}</div>
        </div>
        <div className="order-card__left">
          <div className="order-card__count">{quantity} واحد</div>
          <div className="order-card__unit-price">
            قیمت واحد: {formatPrice(unitPrice)}
          </div>
          {color === "warning" && (
            <button
              className="order-card__action-btn"
              onClick={handleDeleteOrder}
            >
              حذف
            </button>
          )}
          {color === "success" && (
            <button className="order-card__action-btn">بایگانی</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
