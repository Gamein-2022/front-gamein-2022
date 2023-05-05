import classNames from "classnames";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import sampleImg from "../../../../assets/icons/copper.png";
import { toast } from "react-toastify";
import {
  acceptOffer,
  archiveFinalOrder,
  archiveOrder,
  cancelFinalOrder,
  cancelOrder,
  getOrderOffers,
  getOrdersHistory,
} from "../../../../apis/orders";
import Button from "../../../Button";
import Modal from "../../../Modal";
import tradeModalTitle from "../../../../assets/modals/trade_modal_title.svg";
import noOfferImg from "../../../../assets/no_offer.svg";
import cargoImg from "../../../../assets/cargo.png";
import cargoDisableImg from "../../../../assets/cargo-disable.png";
import airplaneImg from "../../../../assets/airplane.png";
import airplaneDisableImg from "../../../../assets/airplane-disable.png";
import "./style.scss";
import { declineOffer } from "../../../../apis/offers";
import {
  FINAL_MATERIALS,
  INTERMEDIATE_MATERIALS_LEVEL_ONE,
  INTERMEDIATE_MATERIALS_LEVEL_TWO,
  RAW_MATERIALS,
} from "../../../../constants/materials";
import { formatPrice } from "../../../../utils/formatters";
import { FormatPaintRounded } from "@mui/icons-material";
import TransportEmptyState from "../../../TansportEmptyState";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [finalOrders, setFinalOrders] = useState([]);
  const [orderTrackingModalOpen, setOrderTrackingModalOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState();
  const [transport, setTransport] = useState("airplane");
  const [balance, setBalance] = useState();
  const [selectedOrder, setSelectedOrder] = useState();

  useEffect(() => {
    getOrdersHistory()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setOrders(data.result?.orders || []);
        setFinalOrders(data.result?.finalOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateOrders = () => {
    getOrdersHistory()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setOrders(data.result?.orders || []);
        setFinalOrders(data.result?.finalOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleArchiveOrder = (id) => {
    archiveOrder({ id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`سفارش با موفقیت بایگانی شد.`);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleArchiveFinalOrder = (id) => {
    archiveFinalOrder({ id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`سفارش با موفقیت بایگانی شد.`);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleDeleteOrder = (id) => {
    cancelOrder({ id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`سفارش با موفقیت حذف شد.`);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleDeleteFinalOrder = (id) => {
    cancelFinalOrder({ id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`سفارش با موفقیت حذف شد.`);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleTrackOrder = (id) => {
    setOrderTrackingModalOpen(true);
    setSelectedOrder(orders.find((item) => item.id === id));
    getOrderOffers({ id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setOffers(data.result.offers);
        setBalance(data.result.balance);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleAcceptOffer = () => {
    acceptOffer({
      id: selectedOffer.id,
      shippingMethod: transport === "airplane" ? "PLANE" : "SHIP",
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`خرید با موفقیت نهایی شد.`);
        setOrderTrackingModalOpen(false);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleAcceptSelltOffer = (id) => {
    acceptOffer({
      id,
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`فروش با موفقیت نهایی شد.`);
        setOrderTrackingModalOpen(false);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const updateOrderOffers = (offer) => {
    getOrderOffers({ id: offer.order.id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setOffers(data.result.offers);
        setBalance(data.result.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeclineOffer = (offer) => {
    declineOffer({ offerId: offer.id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`پیشنهاد با موفقیت رد شد.`);
        updateOrderOffers(offer);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const transportCost =
    transport === "ship"
      ? selectedOffer?.shipPrice +
        Math.floor(
          (selectedOffer?.shipPrice / 100) *
            Math.sqrt(
              selectedOffer?.order?.quantity *
                selectedOffer?.unitVolume *
                selectedOffer?.distance
            )
        )
      : selectedOffer?.planePrice +
        Math.floor(
          (selectedOffer?.planePrice / 100) *
            Math.sqrt(
              selectedOffer?.order?.quantity *
                selectedOffer?.unitVolume *
                selectedOffer?.distance
            )
        );

  return (
    <>
      <div className="offers-sent">
        {orders?.length <= 0 && (
          <div className="offers-sent__empty"><Trans>شما هیچ سفارش فعالی ندارید.</Trans></div>
        )}
        {orders?.map(
          ({
            acceptDate,
            cancelled,
            id,
            productName,
            unitPrice,
            orderType,
            quantity,
          }) => {
            if (cancelled) {
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
                    ? t`در انتظار ${orderType === "BUY" ? t`فروشنده` : t`خریدار`}`
                    : orderType === "BUY"
                    ? t`خریداری شده`
                    : t`فروخته‌شده`}
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
                    <div className="order-card__count">           {plural(quantity, {
  one: `# واحد`,
  other: `# واحد`
})} </div>
                    <div className="order-card__unit-price">
                     <Trans> قیمت واحد:</Trans> {formatPrice(unitPrice)}
                    </div>
                    {isWaiting && (
                      <div className="order-card__btns">
                        <Button
                          className="order-card__btn-error"
                          onClick={() => handleDeleteOrder(id)}
                        >
                          <Trans>حذف</Trans>
                        </Button>
                        <Button
                          className="order-card__btn-success"
                          onClick={() => handleTrackOrder(id)}
                        >
                          <Trans>پیگیری</Trans>
                        </Button>
                      </div>
                    )}
                    {!isWaiting && (
                      <Button
                        className="order-card__btn-success"
                        onClick={() => handleArchiveOrder(id)}
                      >
                        <Trans>بایگانی</Trans>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
        {finalOrders?.map(
          ({
            acceptDate,
            cancelled,
            id,
            product,
            unitPrice,
            orderType,
            quantity,
            soldQuantity,
            closed,
          }) => {
            if (cancelled) {
              return null;
            }
            return (
              <div
                className={classNames("order-card", {
                  "order-card--warning": soldQuantity <= 0,
                })}
              >
                <div className="order-card__title">
                  {soldQuantity <= 0 ? (
                    <AccessTimeIcon fontSize="small" />
                  ) : (
                    <CheckIcon fontSize="small" />
                  )}
                  {soldQuantity <= 0 ? t`در انتظار خریدار` :t`فروخته‌شده`}
                </div>
                <div className="order-card__body">
                  <div className="order-card__right">
                    <img
                      className="order-card__img"
                      src={
                        RAW_MATERIALS[product?.name]?.icon ||
                        INTERMEDIATE_MATERIALS_LEVEL_ONE[product?.name]?.icon ||
                        INTERMEDIATE_MATERIALS_LEVEL_TWO[product?.name]?.icon ||
                        FINAL_MATERIALS[product?.name]?.icon ||
                        sampleImg
                      }
                      alt="order card"
                    />
                    <div className="order-card__name">{product?.name}</div>
                  </div>
                  <div className="order-card__left">
                    <div className="order-card__count">{quantity} واحد</div>
                    <div className="order-card__unit-price">
                      <Trans>قیمت واحد:</Trans> {formatPrice(unitPrice)}
                    </div>
                    <div><Trans>مقدار فروخته‌شده:</Trans> {soldQuantity}</div>
                    {closed && (
                      <Button
                        className="order-card__btn-success"
                        onClick={() => handleArchiveFinalOrder(id)}
                      >
                        <Trans>بایگانی</Trans>
                      </Button>
                    )}
                    {!closed && (
                      <Button
                        className="order-card__btn-error"
                        onClick={() => handleDeleteFinalOrder(id)}
                      >
                        <Trans>حذف</Trans>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <Modal
        open={orderTrackingModalOpen}
        onClose={() => setOrderTrackingModalOpen(false)}
        title={<img src={tradeModalTitle} alt="trade" />}
      >
        <div className="order-tracking">
          {!selectedOffer && selectedOrder && (
            <div>
              {selectedOrder?.orderType === "BUY"
                ? t`مشاهده فروشنده‌ها`
                : t`مشاهده خریدارها`}
            </div>
          )}
          {offers.length === 0 && (
            <div className="order-tracking__no-offers">
              <img src={noOfferImg} alt="no offer found" />
              <div>
               <Trans> هنوز هیچ{" "}
                {selectedOrder?.orderType === "BUY" ? "فروشنده‌ای" : "خریداری"}{" "}
                پیدا نشده!</Trans>
              </div>
            </div>
          )}
          {offers.length > 0 &&
            !selectedOffer &&
            offers.map((offer) => (
              <div className="order-offer">
                <div className="order-offer__header">
                  <div className="order-offer__region">
                    <Trans>از منطقه </Trans>{offer.region}
                  </div>
                  <div className="order-offer__price">
                    <Trans>قیمت واحد: </Trans>{formatPrice(offer.order.unitPrice)}
                  </div>
                </div>
                <div className="order-offer__body">
                  {offer.distance > 0 ? (
                    <div>
                      <div>
                     <Trans> ارسال با هواپیما در {offer.planeDuration * 8} ثانیه با
                        هزینه {offer.planePrice}</Trans>
                      </div>
                      <div>
                        ارسال با کشتی در {offer.shipDuration * 8} ثانیه با هزینه{" "}
                        {offer.shipPrice}
                      </div>
                    </div>
                  ) : (
                    <TransportEmptyState />
                  )}
                  <div className="order-card__btns">
                    <Button
                      onClick={() => handleDeclineOffer(offer)}
                      className="order-card__btn-error"
                    >
                      <Trans>رد کردن</Trans>
                    </Button>
                    <Button
                      onClick={() => {
                        if (selectedOrder?.orderType === "BUY") {
                          setSelectedOffer(offer);
                        } else {
                          handleAcceptSelltOffer(offer.id);
                        }
                      }}
                      className="order-card__btn-success"
                    >
                      {selectedOrder?.orderType === "BUY" ? t`خرید` : `فروش`}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {selectedOffer && (
            <div className="order-offer-final">
              <div className="order-offer-final__top">
                <div className="order-offer-final__title"><Trans>تکمیل خرید</Trans></div>
                <div className="order-offer-final__description">
             <Trans>اینجا می‌تونی با تعیین نوع حمل و نقل و بعد از حساب کردن هزینه کل، خریدن رو کامل کنی !</Trans>
                </div>
                <div className="order-offer-final__region-info">
                  <Trans>خرید {selectedOffer.order.productName} از منطقه{" "}
                  {selectedOffer.region}</Trans>
                </div>
                <div className="order-offer-final__count">
                 <Trans> تعداد {selectedOffer.order.quantity} واحد</Trans>
                </div>
                {selectedOffer.distance > 0 ? (
                  <>
                    <div className="shop-modal__transport-name">
                    <Trans>  با چه وسیله‌ای ارسال بشه؟</Trans>
                    </div>
                    <div className="shop-modal__transport-list">
                      <div
                        className={classNames("shop-modal__transport", {
                          "shop-modal__transport--active":
                            transport === "airplane",
                        })}
                        onClick={() => setTransport("airplane")}
                      >
                        <img
                          className="shop-modal__transport-img"
                          src={
                            transport === "airplane"
                              ? airplaneImg
                              : airplaneDisableImg
                          }
                          alt="airplane"
                        />
                        <div className="shop-modal__transport-text">
                          <Trans>هواپیما</Trans>
                          <br />
                        <Trans>  در {selectedOffer.planeDuration} ثانیه</Trans>
                        </div>
                      </div>
                      <div
                        className={classNames("shop-modal__transport", {
                          "shop-modal__transport--active": transport === "ship",
                        })}
                        onClick={() => setTransport("ship")}
                      >
                        <img
                          className="shop-modal__transport-img"
                          src={
                            transport === "ship" ? cargoImg : cargoDisableImg
                          }
                          alt="airplane"
                        />
                        <div className="shop-modal__transport-text">
                         <Trans> کشتی</Trans>
                          <br />
                          <Trans>در {selectedOffer.shipDuration} ثانیه</Trans>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <TransportEmptyState />
                )}
              </div>
              <div className="shop-modal__summary-text">
                <Trans>هزینه خرید کالاها:{" "}
                {formatPrice(
                  selectedOffer.order.quantity * selectedOffer.order.unitPrice
                )}</Trans>
              </div>
              <div className="shop-modal__summary-text">
               <Trans> هزینه حمل و نقل: {formatPrice(transportCost)}</Trans>
              </div>
              <div className="shop-modal__summary-text">
              <Trans>  جمع کل:</Trans>{" "}
                {formatPrice(
                  selectedOffer.order.quantity * selectedOffer.order.unitPrice +
                    transportCost
                )}
              </div>
              <div className="shop-modal__seperator"></div>
              <div className="shop-modal__summary-text">
              <Trans>  دارایی فعلی:</Trans> {formatPrice(balance)}
              </div>
              <div className="shop-modal__summary-text">
              <Trans>  دارایی پس از خرید:</Trans>{" "}
                {formatPrice(
                  balance -
                    (selectedOffer.order.quantity *
                      selectedOffer.order.unitPrice +
                      transportCost)
                )}
              </div>
              <div className="order-offer-final__action-btns">
                <Button
                  className="order-offer-final__finalize-btn"
                  onClick={handleAcceptOffer}
                >
                  <Trans>تکمیل خرید</Trans>
                </Button>
                <Button onClick={() => setSelectedOffer(null)} type="secondary">
                  <Trans>بازگشت</Trans>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Orders;
