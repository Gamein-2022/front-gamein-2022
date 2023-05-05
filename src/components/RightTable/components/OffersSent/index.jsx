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
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
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
        toast.success(t`پیشنهاد با موفقیت حذف شد.`);
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
        toast.success(t`پیشنهاد با موفقیت بایگانی شد.`);
        updateSentOffers();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  return (
    <div className="offers-sent">
      {sentOffers?.length <= 0 && (
        <div className="offers-sent__empty">
         <Trans> شما هیچ پیشنهاد فرستاده‌شده‌ای ندارید.</Trans>
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
                ? t`در انتظار ${
                    order?.orderType === "SELL" ? t`فروشنده` : t`خریدار`
                  }`
                : order?.orderType === "SELL"
                ? t`خریداری شده`
                : t`فروخته‌شده`}
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
                 <Trans> قیمت واحد:</Trans> {formatPrice(order?.unitPrice)}
                </div>
                {isWaiting && (
                  <button
                    className="order-card__action-btn"
                    onClick={() => handleDeleteOffer(id)}
                  >
                   <Trans> حذف</Trans>
                  </button>
                )}
                {!isWaiting && (
                  <button
                    className="order-card__action-btn"
                    onClick={() => handleArchiveOffer(id)}
                  >
                   <Trans> بایگانی</Trans>
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
