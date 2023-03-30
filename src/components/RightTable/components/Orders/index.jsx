import classNames from "classnames";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import sampleImg from "../../../../assets/icons/copper.png";
import { toast } from "react-toastify";
import {
  acceptOffer,
  archiveOrder,
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

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderTrackingModalOpen, setOrderTrackingModalOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState();
  const [transport, setTransport] = useState("airplane");
  const [balance, setBalance] = useState();

  useEffect(() => {
    getOrdersHistory()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setOrders(data.result);
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
        setOrders(data.result);
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
        toast.success("سفارش با موفقیت بایگانی شد.");
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleDeleteOrder = (id) => {
    cancelOrder({ id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("سفارش با موفقیت حذف شد.");
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleTrackOrder = (id) => {
    setOrderTrackingModalOpen(true);
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
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleAcceptOffer = () => {
    acceptOffer({
      id: selectedOffer.id,
      shippingMethod: transport === "plane" ? "PLANE" : "SHIP",
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("خرید با موفقیت نهایی شد.");
        setOrderTrackingModalOpen(false);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
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
        toast.success("پیشنهاد با موفقیت رد شد.");
        updateOrderOffers(offer);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <>
      <div className="offers-sent">
        {orders.map(
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
                    ? `در انتظار ${orderType === "BUY" ? "فروشنده" : "خریدار"}`
                    : orderType === "BUY"
                    ? "خریداری شده"
                    : "فروخته‌شده"}
                </div>
                <div className="order-card__body">
                  <div className="order-card__right">
                    <img
                      className="order-card__img"
                      src={sampleImg}
                      alt="order card"
                    />
                    <div className="order-card__name">{productName}</div>
                  </div>
                  <div className="order-card__left">
                    <div className="order-card__count">{quantity} واحد</div>
                    <div className="order-card__unit-price">
                      قیمت واحد: {unitPrice}
                    </div>
                    {isWaiting && (
                      <div className="order-card__btns">
                        <Button
                          className="order-card__btn-error"
                          onClick={() => handleDeleteOrder(id)}
                        >
                          حذف
                        </Button>
                        <Button
                          className="order-card__btn-success"
                          onClick={() => handleTrackOrder(id)}
                        >
                          پیگیری
                        </Button>
                      </div>
                    )}
                    {!isWaiting && (
                      <Button
                        className="order-card__btn-success"
                        onClick={() => handleArchiveOrder(id)}
                      >
                        بایگانی
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
          {!selectedOffer && <div>مشاهده فروشنده‌ها</div>}
          {offers.length === 0 && (
            <div className="order-tracking__no-offers">
              <img src={noOfferImg} alt="no offer found" />
              <div>هنوز هیچ فروشنده‌ای پیدا نشده!</div>
            </div>
          )}
          {offers.length > 0 &&
            !selectedOffer &&
            offers.map((offer) => (
              <div className="order-offer">
                <div className="order-offer__header">
                  <div className="order-offer__region">
                    از منطقه {offer.region + 1}
                  </div>
                  <div className="order-offer__price">
                    قیمت واحد: {offer.order.unitPrice}
                  </div>
                </div>
                <div className="order-offer__body">
                  <div>
                    <div>
                      ارسال با هواپیما در {offer.planeDuration} روز با هزینه{" "}
                      {offer.planePrice}
                    </div>
                    <div>
                      ارسال با کشتی در {offer.shipDuration} روز با هزینه{" "}
                      {offer.shipPrice}
                    </div>
                  </div>
                  <div className="order-card__btns">
                    <Button
                      onClick={() => handleDeclineOffer(offer)}
                      className="order-card__btn-error"
                    >
                      رد کردن
                    </Button>
                    <Button
                      onClick={() => setSelectedOffer(offer)}
                      className="order-card__btn-success"
                    >
                      خرید
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {selectedOffer && (
            <div className="order-offer-final">
              <div className="order-offer-final__title">تکمیل خرید</div>
              <div className="order-offer-final__description">
                اینجا می‌تونی با تعیین نوع حمل و نقل و بعد از حساب کردن هزینه
                کل، خریدت رو کامل کنی!
              </div>
              <div>
                خرید {selectedOffer.order.productName} از تیم{" "}
                {selectedOffer.order.submitterTeamName} در منطقه{" "}
                {selectedOffer.region + 1}
              </div>
              <div>تعداد {selectedOffer.order.quantity} واحد</div>
              <div className="shop-modal__transport-name">
                با چه وسیله‌ای ارسال بشه؟
              </div>
              <div className="shop-modal__transport-list">
                <div
                  className={classNames("shop-modal__transport", {
                    "shop-modal__transport--active": transport === "airplane",
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
                    هواپیما
                    <br />
                    در {selectedOffer.planeDuration} روز
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
                    src={transport === "ship" ? cargoImg : cargoDisableImg}
                    alt="airplane"
                  />
                  <div className="shop-modal__transport-text">
                    کشتی
                    <br />
                    در {selectedOffer.shipDuration} روز
                  </div>
                </div>
              </div>
              <div className="shop-modal__summary-text">
                هزینه خرید کالاها:{" "}
                {selectedOffer.order.quantity * selectedOffer.order.unitPrice}
              </div>
              <div className="shop-modal__summary-text">
                هزینه حمل و نقل:{" "}
                {transport === "airplane"
                  ? selectedOffer.planePrice
                  : selectedOffer.shipPrice}
              </div>
              <div className="shop-modal__summary-text">
                جمع کل:{" "}
                {selectedOffer.order.quantity * selectedOffer.order.unitPrice +
                  (transport === "airplane"
                    ? selectedOffer.planePrice
                    : selectedOffer.shipPrice)}
              </div>
              <div className="shop-modal__seperator"></div>
              <div className="shop-modal__summary-text">
                دارایی فعلی: {balance}
              </div>
              <div className="shop-modal__summary-text">
                دارایی پس از خرید:{" "}
                {balance -
                  (selectedOffer.order.quantity *
                    selectedOffer.order.unitPrice +
                    (transport === "airplane"
                      ? selectedOffer.planePrice
                      : selectedOffer.shipPrice))}
              </div>
              <div>
                <Button onClick={handleAcceptOffer}>تکمیل خرید</Button>
                <Button onClick={() => setSelectedOffer(null)} type="secondary">
                  بازگشت
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
