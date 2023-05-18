import classNames from "classnames";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
import cargoImg from "../../../../assets/cargo.svg";
import cargoDisableImg from "../../../../assets/cargo-disable.svg";
import airplaneImg from "../../../../assets/airplane.svg";
import airplaneDisableImg from "../../../../assets/airplane-disable.svg";
import "./style.scss";
import { declineOffer } from "../../../../apis/offers";
import { formatPrice } from "../../../../utils/formatters";
import TransportEmptyState from "../../../TansportEmptyState";
import { getProductIcon } from "../../../../utils/icons";
import GameinLoading from "../../../GameinLoading";
import useUpdateBalance from "../../../../hooks/useUpdateBalance";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [finalOrders, setFinalOrders] = useState([]);
  const [orderTrackingModalOpen, setOrderTrackingModalOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState();
  const [transport, setTransport] = useState("airplane");
  const [balance, setBalance] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [trackLoading, setTrackLoading] = useState(false);

  const updateBalance = useUpdateBalance();

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
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const updateOrders = () => {
    setPageLoading(true);
    getOrdersHistory()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setOrders(data.result?.orders || []);
        setFinalOrders(data.result?.finalOrders);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPageLoading(false);
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

  const handleArchiveFinalOrder = (id) => {
    archiveFinalOrder({ id })
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
        updateBalance();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleDeleteFinalOrder = (id) => {
    cancelFinalOrder({ id })
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
    setTrackLoading(true);
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
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      })
      .finally(() => {
        setTrackLoading(false);
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

  const handleAcceptSelltOffer = (id) => {
    acceptOffer({
      id,
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("فروش با موفقیت نهایی شد.");
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

  const transportCost =
    selectedOffer?.distance > 0
      ? transport === "ship"
        ? selectedOffer?.shipBasePrice +
          selectedOffer?.shipVarPrice *
            Math.floor(
              Math.sqrt(
                selectedOffer?.order?.quantity *
                  selectedOffer?.order?.product?.unitVolume *
                  selectedOffer?.distance
              )
            )
        : selectedOffer?.planeBasePrice +
          selectedOffer?.planeVarPrice *
            Math.floor(
              Math.sqrt(
                selectedOffer?.order?.quantity *
                  selectedOffer?.order?.product?.unitVolume *
                  selectedOffer?.distance
              )
            )
      : selectedOffer?.shipBasePrice;
  return (
    <>
      <div className="offers-sent">
        {pageLoading && <GameinLoading size={32} />}
        {!pageLoading && (
          <>
            {orders?.length <= 0 && (
              <div className="offers-sent__empty">
                شما هیچ سفارش فعالی ندارید.
              </div>
            )}
            {orders
              ?.filter((item) => !item?.acceptDate)
              .map(
                ({
                  acceptDate,
                  cancelled,
                  id,
                  product,
                  unitPrice,
                  orderType,
                  quantity,
                  offerCount,
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
                          ? `در انتظار ${
                              orderType === "BUY" ? "فروشنده" : "خریدار"
                            }`
                          : orderType === "BUY"
                          ? "خریداری شده"
                          : "فروخته‌شده"}
                        {isWaiting && (
                          <div className="order-card__offer-count">
                            {offerCount}
                          </div>
                        )}
                      </div>
                      <div className="order-card__body">
                        <div className="order-card__right">
                          <img
                            className="order-card__img"
                            src={getProductIcon(product?.name)}
                            alt="order card"
                          />
                        </div>
                        <div className="order-card__left">
                          <div className="order-card__name">
                            {product?.prettyName || product.name}
                          </div>
                          <div className="order-card__count">
                            {formatPrice(quantity)} واحد
                          </div>
                          <div className="order-card__unit-price">
                            قیمت واحد: {formatPrice(unitPrice)}
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
            {finalOrders
              ?.filter((item) => !item?.closed)
              .map(
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
                        "order-card--warning": !closed,
                      })}
                    >
                      <div className="order-card__title">
                        {!closed ? (
                          <AccessTimeIcon fontSize="small" />
                        ) : (
                          <CheckIcon fontSize="small" />
                        )}
                        {!closed ? "در انتظار خریدار" : "فروخته‌شده"}
                      </div>
                      <div className="order-card__body">
                        <div className="order-card__right">
                          <img
                            className="order-card__img"
                            src={getProductIcon(product?.name)}
                            alt="order card"
                          />
                        </div>
                        <div className="order-card__left">
                          <div className="order-card__name">
                            {product?.name}
                          </div>
                          <div className="order-card__count">
                            {quantity} واحد
                          </div>
                          <div className="order-card__unit-price">
                            قیمت واحد: {formatPrice(unitPrice)}
                          </div>
                          <div>مقدار فروخته‌شده: {soldQuantity}</div>
                          {closed && (
                            <Button
                              className="order-card__btn-success"
                              onClick={() => handleArchiveFinalOrder(id)}
                            >
                              بایگانی
                            </Button>
                          )}
                          {!closed && (
                            <Button
                              className="order-card__btn-error"
                              onClick={() => handleDeleteFinalOrder(id)}
                            >
                              حذف
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            {finalOrders
              ?.filter((item) => item?.closed)
              .map(
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
                        "order-card--warning": !closed,
                      })}
                    >
                      <div className="order-card__title">
                        {!closed ? (
                          <AccessTimeIcon fontSize="small" />
                        ) : (
                          <CheckIcon fontSize="small" />
                        )}
                        {!closed ? "در انتظار خریدار" : "فروخته‌شده"}
                      </div>
                      <div className="order-card__body">
                        <div className="order-card__right">
                          <img
                            className="order-card__img"
                            src={getProductIcon(product?.name)}
                            alt="order card"
                          />
                        </div>
                        <div className="order-card__left">
                          <div className="order-card__name">
                            {product?.name}
                          </div>
                          <div className="order-card__count">
                            {quantity} واحد
                          </div>
                          <div className="order-card__unit-price">
                            قیمت واحد: {formatPrice(unitPrice)}
                          </div>
                          <div>مقدار فروخته‌شده: {soldQuantity}</div>
                          {closed && (
                            <Button
                              className="order-card__btn-success"
                              onClick={() => handleArchiveFinalOrder(id)}
                            >
                              بایگانی
                            </Button>
                          )}
                          {!closed && (
                            <Button
                              className="order-card__btn-error"
                              onClick={() => handleDeleteFinalOrder(id)}
                            >
                              حذف
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            {orders
              ?.filter((item) => item?.acceptDate)
              .map(
                ({
                  acceptDate,
                  cancelled,
                  id,
                  product,
                  unitPrice,
                  orderType,
                  quantity,
                  offerCount,
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
                          ? `در انتظار ${
                              orderType === "BUY" ? "فروشنده" : "خریدار"
                            }`
                          : orderType === "BUY"
                          ? "خریداری شده"
                          : "فروخته‌شده"}
                        {isWaiting && (
                          <div className="order-card__offer-count">
                            {offerCount}
                          </div>
                        )}
                      </div>
                      <div className="order-card__body">
                        <div className="order-card__right">
                          <img
                            className="order-card__img"
                            src={getProductIcon(product?.name)}
                            alt="order card"
                          />
                        </div>
                        <div className="order-card__left">
                          <div className="order-card__name">
                            {product?.prettyName || product.name}
                          </div>
                          <div className="order-card__count">
                            {formatPrice(quantity)} واحد
                          </div>
                          <div className="order-card__unit-price">
                            قیمت واحد: {formatPrice(unitPrice)}
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
                      "order-card--warning": !closed,
                    })}
                  >
                    <div className="order-card__title">
                      {!closed ? (
                        <AccessTimeIcon fontSize="small" />
                      ) : (
                        <CheckIcon fontSize="small" />
                      )}
                      {!closed ? "در انتظار خریدار" : "فروخته‌شده"}
                    </div>
                    <div className="order-card__body">
                      <div className="order-card__right">
                        <img
                          className="order-card__img"
                          src={getProductIcon(product?.name)}
                          alt="order card"
                        />
                      </div>
                      <div className="order-card__left">
                        <div className="order-card__name">{product?.name}</div>
                        <div className="order-card__count">{quantity} واحد</div>
                        <div className="order-card__unit-price">
                          قیمت واحد: {formatPrice(unitPrice)}
                        </div>
                        <div>مقدار فروخته‌شده: {soldQuantity}</div>
                        {closed && (
                          <Button
                            className="order-card__btn-success"
                            onClick={() => handleArchiveFinalOrder(id)}
                          >
                            بایگانی
                          </Button>
                        )}
                        {!closed && (
                          <Button
                            className="order-card__btn-error"
                            onClick={() => handleDeleteFinalOrder(id)}
                          >
                            حذف
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </>
        )}
      </div>
      <Modal
        open={orderTrackingModalOpen}
        onClose={() => {
          setOrderTrackingModalOpen(false);
          setSelectedOffer(null);
        }}
        title={<img src={tradeModalTitle} alt="trade" />}
      >
        <div className="order-tracking">
          {trackLoading && <GameinLoading size={32} />}
          {!trackLoading && (
            <>
              {!selectedOffer && selectedOrder && (
                <div>
                  {selectedOrder?.orderType === "BUY"
                    ? "مشاهده فروشنده‌ها"
                    : "مشاهده خریدارها"}
                </div>
              )}
              {offers.length === 0 && (
                <div className="order-tracking__no-offers">
                  <img src={noOfferImg} alt="no offer found" />
                  <div>
                    هنوز هیچ{" "}
                    {selectedOrder?.orderType === "BUY"
                      ? "فروشنده‌ای"
                      : "خریداری"}{" "}
                    پیدا نشده!
                  </div>
                </div>
              )}
              {offers.length > 0 &&
                !selectedOffer &&
                offers.map((offer) => (
                  <div className="order-offer">
                    <div className="order-offer__header">
                      <div className="order-offer__region">
                        از منطقه {offer.region}
                      </div>
                      <div className="order-offer__price">
                        قیمت واحد: {formatPrice(offer?.order?.unitPrice)}
                      </div>
                    </div>
                    <div className="order-offer__body">
                      <div></div>
                      <div className="order-card__btns">
                        <Button
                          onClick={() => handleDeclineOffer(offer)}
                          className="order-card__btn-error"
                        >
                          رد کردن
                        </Button>
                        <Button
                          onClick={() => {
                            if (selectedOrder?.orderType === "BUY") {
                              setSelectedOffer(offer);
                            } else {
                              handleAcceptSelltOffer(offer?.id);
                            }
                          }}
                          className="order-card__btn-success"
                        >
                          {selectedOrder?.orderType === "BUY" ? "خرید" : "فروش"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              {selectedOffer && (
                <div className="order-offer-final">
                  <div className="order-offer-final__top">
                    <div className="order-offer-final__title">تکمیل خرید</div>
                    <div className="order-offer-final__description">
                      اینجا می‌تونی با تعیین نوع حمل و نقل و بعد از حساب کردن
                      هزینه کل، خریدت رو کامل کنی!
                    </div>
                    <div className="order-offer-final__region-info">
                      خرید {selectedOffer.order.productName} از منطقه{" "}
                      {selectedOffer.region}
                    </div>
                    <div className="order-offer-final__count">
                      تعداد {selectedOffer.order.quantity} واحد
                    </div>
                    {selectedOffer.distance > 0 ? (
                      <>
                        <div className="shop-modal__transport-name">
                          با چه وسیله‌ای ارسال بشه؟
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
                              هواپیما
                              <br />
                              در {selectedOffer.planeDuration} ثانیه
                            </div>
                          </div>
                          <div
                            className={classNames("shop-modal__transport", {
                              "shop-modal__transport--active":
                                transport === "ship",
                            })}
                            onClick={() => setTransport("ship")}
                          >
                            <img
                              className="shop-modal__transport-img"
                              src={
                                transport === "ship"
                                  ? cargoImg
                                  : cargoDisableImg
                              }
                              alt="airplane"
                            />
                            <div className="shop-modal__transport-text">
                              کشتی
                              <br />
                              در {selectedOffer.shipDuration} ثانیه
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <TransportEmptyState />
                    )}
                  </div>
                  <div className="shop-modal__summary-text">
                    هزینه خرید کالاها:{" "}
                    {formatPrice(
                      selectedOffer.order.quantity *
                        selectedOffer.order.unitPrice
                    )}
                  </div>
                  <div className="shop-modal__summary-text">
                    هزینه حمل و نقل: {formatPrice(transportCost)}
                  </div>
                  <div className="shop-modal__summary-text">
                    جمع کل:{" "}
                    {formatPrice(
                      selectedOffer.order.quantity *
                        selectedOffer.order.unitPrice +
                        transportCost
                    )}
                  </div>
                  <div className="shop-modal__seperator"></div>
                  <div className="shop-modal__summary-text">
                    دارایی فعلی: {formatPrice(balance)}
                  </div>
                  <div className="shop-modal__summary-text">
                    دارایی پس از خرید:{" "}
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
                      تکمیل خرید
                    </Button>
                    <Button
                      onClick={() => setSelectedOffer(null)}
                      type="secondary"
                    >
                      بازگشت
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Orders;
