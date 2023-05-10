import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getIntermediateMaterials,
  getOrders,
  sendOffer,
  submitBuyOrder,
  submitSellOrder,
} from "../../../../apis/trade";
import Button from "../../../Button";
import Modal from "../../../Modal";
import tradeModalTitle from "../../../../assets/modals/trade_modal_title.svg";

import cargoImg from "../../../../assets/cargo.png";
import cargoDisableImg from "../../../../assets/cargo-disable.png";
import airplaneImg from "../../../../assets/airplane.png";
import airplaneDisableImg from "../../../../assets/airplane-disable.png";
import sampleImg from "../../../../assets/icons/copper.png";

import "./style.scss";
import { getOrderShippingInfo } from "../../../../apis/orders";
import { Tooltip } from "@mui/material";
import { formatPrice, isEmpty } from "../../../../utils/formatters";
import NumberInput from "../../../NumberInput";
import { getProductIcon } from "../../../../utils/icons";
import TransportEmptyState from "../../../TansportEmptyState";

function TradeIntermediate() {
  const [activeTab, setActiveTab] = useState("buy");
  const [buyOrderModalOpen, setBuyOrderModalOpen] = useState(false);
  const [sellOrderModalOpen, setSellOrderModalOpen] = useState(false);
  const [buyOfferModalOpen, setBuyOfferModalOpen] = useState(false);
  const [intermediateMaterials, setIntermediateMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState();

  const [buyCount, setBuyCount] = useState(0);
  const [buyCountError, setBuyCountError] = useState(false);
  const [buyPrice, setBuyPrice] = useState(0);
  const [buyPriceError, setBuyPriceError] = useState(false);

  const [sellCount, setSellCount] = useState(0);
  const [sellCountError, setSellCountError] = useState(false);
  const [sellPrice, setSellPrice] = useState(0);
  const [sellPriceError, setSellPriceError] = useState(false);

  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [transport, setTransport] = useState("airplane");
  const [shippingInfo, setShippingInfo] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [data, setData] = useState();

  const handleSubmitBuyOrder = () => {
    const productId = intermediateMaterials.find(
      (item) => item.name === selectedMaterial
    ).id;
    submitBuyOrder({ productId, price: buyPrice, quantity: buyCount })
      .then((res) => res.data)
      .then((data) => {
        toast.success("سفارش خرید با موفقیت ثبت شد.");
        setBuyOrderModalOpen(false);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده است."
        );
      });
  };

  const handleSubmitSellOrder = () => {
    const productId = intermediateMaterials.find(
      (item) => item.name === selectedMaterial
    ).id;
    submitSellOrder({ productId, price: sellPrice, quantity: sellCount })
      .then((res) => res.data)
      .then((data) => {
        toast.success("سفارش فروش با موفقیت ثبت شد.");
        setSellOrderModalOpen(false);
        updateOrders();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده است."
        );
      });
  };

  useEffect(() => {
    getIntermediateMaterials()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setIntermediateMaterials(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getOrders()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setData(data.result);
        setBuyOrders(data.result.filter((item) => item.orderType === "SELL"));
        setSellOrders(data.result.filter((item) => item.orderType === "BUY"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateOrders = () => {
    getOrders()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setBuyOrders(data.result.filter((item) => item.orderType === "SELL"));
        setSellOrders(data.result.filter((item) => item.orderType === "BUY"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const currentOrders = activeTab === "buy" ? buyOrders : sellOrders;

  const handleSendSellOffer = (id) => {
    sendOffer({ orderId: id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("پیشنهاد فروش با موفقیت فرستاده شد.");
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleBuyOfferModal = (row) => {
    setSelectedOrder(row);
    getOrderShippingInfo({ id: row.id })
      .then((res) => res.data)
      .then((data) => {
        setBuyOfferModalOpen(true);
        console.log(data);
        setShippingInfo(data.result);
      });
  };

  const handleSendBuyOffer = () => {
    sendOffer({
      orderId: selectedOrder.id,
      shippingMethod: transport === "airplane" ? "PLANE" : "SHIP",
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("پیشنهاد خرید با موفقیت ارسال شد.");
        setBuyOfferModalOpen(false);
        setSelectedOrder(null);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleSearch = () => {
    getOrders()
      .then((res) => res.data)
      .then((data) => {
        console.log(data.result);
        setData(data.result);
        setBuyOrders(
          data.result
            .filter((item) => item.orderType === "SELL")
            .filter(
              (item) =>
                !selectedMaterial || item?.product?.name === selectedMaterial
            )
        );
        setSellOrders(
          data.result
            .filter((item) => item.orderType === "BUY")
            .filter(
              (item) =>
                !selectedMaterial || item?.product?.name === selectedMaterial
            )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transportCost =
    shippingInfo?.distance > 0
      ? transport === "ship"
        ? shippingInfo?.shipBasePrice +
          shippingInfo?.shipVariablePrice *
            Math.floor(
              Math.sqrt(
                selectedOrder?.quantity *
                  selectedOrder?.product?.unitVolume *
                  shippingInfo?.distance
              )
            )
        : shippingInfo?.planeBasePrice +
          shippingInfo?.planeVariablePrice *
            Math.floor(
              Math.sqrt(
                selectedOrder?.quantity *
                  selectedOrder?.product?.unitVolume *
                  shippingInfo?.distance
              )
            )
      : shippingInfo?.shipBasePrice;

  return (
    <>
      <div className="trade-filter">
        <div className="trade-filter__top">
          <div className="trade-filter__filters">
            <select
              onChange={(e) => {
                setSelectedMaterial(e.target.value);
                setBuyOrders(
                  data
                    .filter((item) => item.orderType === "SELL")
                    .filter((item) => item?.product?.name === e.target.value)
                );
                setSellOrders(
                  data
                    .filter((item) => item.orderType === "BUY")
                    .filter((item) => item?.product?.name === e.target.value)
                );
              }}
              value={selectedMaterial}
              className="trade-filter__select"
            >
              <option disabled selected>
                انتخاب کالا
              </option>
              {intermediateMaterials.map((material) => (
                <option value={material.name}>{material.prettyName}</option>
              ))}
            </select>
            <div className="trade-filter__tabs">
              <div
                onClick={() => setActiveTab("buy")}
                className={classNames(
                  "trade-filter__tab trade-filter__tab-buy",
                  {
                    "trade-filter__tab-buy--active": activeTab === "buy",
                  }
                )}
              >
                خرید
              </div>
              <div
                onClick={() => setActiveTab("sell")}
                className={classNames(
                  "trade-filter__tab trade-filter__tab-sell",
                  {
                    "trade-filter__tab-sell--active": activeTab === "sell",
                  }
                )}
              >
                فروش
              </div>
            </div>
            <Button onClick={handleSearch} className="trade-filter__search-btn">
              بروزرسانی
            </Button>
          </div>
          {currentOrders.length > 0 && (
            <div className="trade-filter__table-wrapper">
              <table className="trade-filter__table">
                <thead>
                  <tr>
                    <td>کالا</td>
                    <td>تعداد</td>
                    <td>قیمت واحد</td>
                    <td>منطقه</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((row) => (
                    <tr>
                      <td className="trade-filter__table-row-img-wrapper">
                        <Tooltip title={row?.product?.prettyName}>
                          <img
                            className="trade-filter__table-row-img"
                            src={getProductIcon(row?.product?.name)}
                            alt=""
                          />
                        </Tooltip>
                      </td>
                      <td>{row.quantity}</td>
                      <td>{formatPrice(row.unitPrice)}</td>
                      <td>{row.region}</td>
                      <td>
                        {activeTab === "buy" && (
                          <button
                            className="trade-filter__buy-btn"
                            onClick={() => handleBuyOfferModal(row)}
                          >
                            خرید
                          </button>
                        )}
                        {activeTab === "sell" && (
                          <button
                            className="trade-filter__sell-btn"
                            onClick={() => handleSendSellOffer(row.id)}
                          >
                            فروش
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="trade-filter__create-order">
          {activeTab === "buy" && (
            <div className="trade-filter__create-order-bottom">
              {!selectedMaterial && <p>ابتدا یک کالا انتخاب کنید.</p>}
              <Button
                onClick={() => setBuyOrderModalOpen(true)}
                className="trade-filter__buy-btn"
                disabled={!selectedMaterial}
              >
                ثبت سفارش خرید
              </Button>
            </div>
          )}
          {activeTab === "sell" && (
            <div className="trade-filter__create-order-bottom">
              {!selectedMaterial && <p>ابتدا یک کالا انتخاب کنید.</p>}
              <Button
                onClick={() => setSellOrderModalOpen(true)}
                className="trade-filter__sell-btn"
                disabled={!selectedMaterial}
              >
                ثبت سفارش فروش
              </Button>
            </div>
          )}
        </div>
      </div>
      <Modal
        title={<img src={tradeModalTitle} alt="trade" />}
        open={buyOrderModalOpen}
        onClose={() => setBuyOrderModalOpen(false)}
      >
        <div className="submit-order-modal__title">ثبت سفارش خرید</div>
        <img
          className="submit-order-modal__img"
          src={getProductIcon(selectedMaterial)}
          alt={selectedMaterial}
        />
        <div className="submit-order-modal__product-name">
          {intermediateMaterials.find((item) => item?.name === selectedMaterial)
            ?.prettyName || selectedMaterial}
        </div>
        <NumberInput
          label={"چند واحد می‌خوای بخری؟"}
          min={0}
          value={buyCount}
          step={100}
          onChange={(value) => setBuyCount(value)}
          setHasError={setBuyCountError}
        />
        <NumberInput
          label={"هر واحد رو حداکثر با چه قیمتی می‌خوای بخری؟"}
          min={0}
          value={buyPrice}
          step={100}
          onChange={(value) => setBuyPrice(value)}
          setHasError={setBuyPriceError}
        />
        <div>
          حداقل قیمت:{" "}
          {formatPrice(
            intermediateMaterials.find((item) => item.name === selectedMaterial)
              ?.minPrice || 0
          )}
        </div>
        <div>
          حداکثر قیمت:{" "}
          {formatPrice(
            intermediateMaterials.find((item) => item.name === selectedMaterial)
              ?.maxPrice || 0
          )}
        </div>
        <div>هزینه خرید کالاها: {formatPrice(buyCount * buyPrice)}</div>
        <Button
          disabled={
            buyCountError ||
            buyPriceError ||
            isEmpty(buyCount) ||
            isEmpty(buyPrice) ||
            buyCount == "0" ||
            buyPrice == "0"
          }
          onClick={handleSubmitBuyOrder}
        >
          تایید خرید
        </Button>
      </Modal>
      <Modal
        title={<img src={tradeModalTitle} alt="trade" />}
        open={sellOrderModalOpen}
        onClose={() => setSellOrderModalOpen(false)}
      >
        <div className="submit-order-modal__title">ثبت سفارش فروش</div>
        <img
          className="submit-order-modal__img"
          src={getProductIcon(selectedMaterial)}
          alt={selectedMaterial}
        />
        <div className="submit-order-modal__product-name">
          {intermediateMaterials.find((item) => item?.name === selectedMaterial)
            ?.prettyName || selectedMaterial}
        </div>
        <NumberInput
          label={"چند واحد می‌خوای بفروشی؟"}
          min={0}
          step={100}
          value={sellCount}
          onChange={(value) => setSellCount(value)}
          setHasError={setSellCountError}
        />
        <NumberInput
          label={"هر واحد رو حداقل با چه قیمتی می‌خوای بفروشی؟"}
          min={0}
          step={100}
          value={sellPrice}
          onChange={(value) => setSellPrice(value)}
          setHasError={setSellPriceError}
        />
        <div>
          حداقل قیمت:{" "}
          {formatPrice(
            intermediateMaterials.find((item) => item.name === selectedMaterial)
              ?.minPrice || 0
          )}
        </div>
        <div>
          حداکثر قیمت:{" "}
          {formatPrice(
            intermediateMaterials.find((item) => item.name === selectedMaterial)
              ?.maxPrice || 0
          )}
        </div>
        <div>درآمد فروش کالاها: {formatPrice(sellCount * sellPrice || 0)}</div>
        <Button
          disabled={
            sellCountError ||
            sellPriceError ||
            isEmpty(sellCount) ||
            isEmpty(sellPrice) ||
            sellCount == "0" ||
            sellPrice == "0"
          }
          onClick={handleSubmitSellOrder}
          type={"error"}
        >
          تایید فروش
        </Button>
      </Modal>
      <Modal
        title={<img src={tradeModalTitle} alt="trade" />}
        open={buyOfferModalOpen}
        onClose={() => setBuyOfferModalOpen(false)}
      >
        <div className="submit-order-modal__title">ثبت پیشنهاد خرید</div>
        {shippingInfo && selectedOrder && (
          <>
            <img
              className="submit-order-modal__img"
              src={getProductIcon(selectedOrder?.product?.name)}
              alt={selectedOrder?.product?.name}
            />
            <div>
              خرید{" "}
              {selectedOrder?.product?.prettyName ||
                selectedOrder?.product?.name}{" "}
              از منطقه {selectedOrder.region}
            </div>
            <div>تعداد {selectedOrder.quantity} واحد</div>
            {shippingInfo.distance > 0 ? (
              <>
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
                      در {shippingInfo.planeDuration} ثانیه
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
                      در {shippingInfo.shipDuration} ثانیه
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <TransportEmptyState />
            )}
            <div className="shop-modal__summary-text">
              هزینه خرید کالاها:{" "}
              {formatPrice(selectedOrder.quantity * selectedOrder.unitPrice)}
            </div>
            <div className="shop-modal__summary-text">
              هزینه حمل و نقل: {formatPrice(transportCost)}
            </div>
            <div className="shop-modal__summary-text">
              جمع کل:{" "}
              {formatPrice(
                selectedOrder.quantity * selectedOrder.unitPrice + transportCost
              )}
            </div>
            <div className="shop-modal__seperator"></div>
            <div className="shop-modal__summary-text">
              دارایی فعلی: {formatPrice(shippingInfo.balance)}
            </div>
            <div className="shop-modal__summary-text">
              دارایی پس از خرید:{" "}
              {formatPrice(
                shippingInfo.balance -
                  (selectedOrder.quantity * selectedOrder.unitPrice +
                    transportCost)
              )}
            </div>
            <div>
              <Button onClick={handleSendBuyOffer}>ارسال پیشنهاد خرید</Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default TradeIntermediate;
