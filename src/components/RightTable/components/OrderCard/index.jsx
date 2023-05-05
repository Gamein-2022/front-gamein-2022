import React from "react";
import classNames from "classnames";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import sampleImg from "../../../../assets/icons/copper.png";
import "./style.scss";
import { cancelOrder } from "../../../../apis/orders";
import { toast } from "react-toastify";
import {
  INTERMEDIATE_MATERIALS_LEVEL_ONE,
  INTERMEDIATE_MATERIALS_LEVEL_TWO,
  RAW_MATERIALS,
} from "../../../../constants/materials";
import { formatPrice } from "../../../../utils/formatters";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro";
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
        ? t`خریداری شده`
        : t`در انتظار فروشنده`
      : acceptDate
      ? t`فروخته شده`
      : t`در انتظار خریدار`;

  const handleDeleteOrder = () => {
    cancelOrder(id)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`سفارش با موفقیت حذف شد.`);
      })
      .catch((error) => {
        console.log(error);
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
          <div className="order-card__count">

            {plural(quantity, {
  one: `# واحد`,
  other: `# واحد`
})}
</div>
          <div className="order-card__unit-price"><Trans>قیمت واحد:</Trans> {formatPrice(unitPrice)}</div>
          {color === "warning" && (
            <button
              className="order-card__action-btn"
              onClick={handleDeleteOrder}
            >
              <Trans>حذف</Trans>
            </button>
          )}
          {color === "success" && (
            <button className="order-card__action-btn"><Trans>بایگانی</Trans></button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
