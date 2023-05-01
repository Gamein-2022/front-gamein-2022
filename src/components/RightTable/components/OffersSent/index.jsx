import classNames from "classnames";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  archiveOffer,
  cancellOffer,
  getSentOffers,
} from "../../../../apis/offers";
import "./style.scss";
import { toast } from "react-toastify";
import { formatPrice } from "../../../../utils/formatters";
import { getProductIcon } from "../../../../utils/icons";

function OffersSent() {
  const [sentOffers, setSentOffers] = useState([]);

  useEffect(() => {
    getSentOffers()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setSentOffers(data?.result);
      });
  }, []);

  const updateSentOffers = () => {
    getSentOffers()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setSentOffers(data?.result);
      });
  };

  const handleDeleteOffer = (id) => {
    cancellOffer({ offerId: id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("پیشنهاد با موفقیت حذف شد.");
        updateSentOffers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleArchiveOffer = (id) => {
    archiveOffer({ id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("پیشنهاد با موفقیت بایگانی شد.");
        updateSentOffers();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <div className="offers-sent">
      {sentOffers?.length <= 0 && (
        <div className="offers-sent__empty">
          شما هیچ پیشنهاد فرستاده‌شده‌ای ندارید.
        </div>
      )}
      {sentOffers.map(({ acceptDate, declined, cancelled, order, id }) => {
        if (cancelled || declined) {
          return null;
        }
        const isWaiting = !acceptDate;
        return (
          <div
            className={classNames("order-card", {
              "order-card--warning": isWaiting,
            })}
          >
            <div className="order-card__title">
              {isWaiting ? (
                <AccessTimeIcon fontSize="small" />
              ) : (
                <CheckIcon fontSize="small" />
              )}
              {isWaiting
                ? `در انتظار ${
                    order?.orderType === "SELL" ? "فروشنده" : "خریدار"
                  }`
                : order?.orderType === "SELL"
                ? "خریداری شده"
                : "فروخته‌شده"}
            </div>
            <div className="order-card__body">
              <div className="order-card__right">
                <img
                  className="order-card__img"
                  src={getProductIcon(order?.product?.name)}
                  alt="order card"
                />
                <div className="order-card__name">{order?.product?.name}</div>
              </div>
              <div className="order-card__left">
                <div className="order-card__count">{order?.quantity} واحد</div>
                <div className="order-card__unit-price">
                  قیمت واحد: {formatPrice(order?.unitPrice)}
                </div>
                {isWaiting && (
                  <button
                    className="order-card__action-btn"
                    onClick={() => handleDeleteOffer(id)}
                  >
                    حذف
                  </button>
                )}
                {!isWaiting && (
                  <button
                    className="order-card__action-btn"
                    onClick={() => handleArchiveOffer(id)}
                  >
                    بایگانی
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OffersSent;
