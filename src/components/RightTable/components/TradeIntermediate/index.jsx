import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getIntermediateMaterials,
  getOrders,
  getRawMaterials,
  sendOffer,
  submitBuyOrder,
  submitSellOrder,
} from "../../../../apis/trade";
import BasicInput from "../../../BasicInput";
import Button from "../../../Button";
import Modal from "../../../Modal";
import tradeModalTitle from "../../../../assets/modals/trade_modal_title.svg";
import "./style.scss";

function TradeIntermediate() {
  const [activeTab, setActiveTab] = useState("buy");
  const [buyOrderModalOpen, setBuyOrderModalOpen] = useState(false);
  const [sellOrderModalOpen, setSellOrderModalOpen] = useState(false);
  const [buyOfferModalOpen, setBuyOfferModalOpen] = useState(false);
  const [sellOfferModalOpen, setSellOfferModalOpen] = useState(false);
  const [intermediateMaterials, setIntermediateMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [buyCount, setBuyCount] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellCount, setSellCount] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);

  const handleSubmitBuyOrder = () => {
    const productId = intermediateMaterials.find(
      (item) => item.name === selectedMaterial
    ).id;
    submitBuyOrder({ productId, price: buyPrice, quantity: buyCount })
      .then((res) => res.data)
      .then((data) => {
        toast.success("سفارش خرید با موفقیت ثبت شد.");
        setBuyOrderModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitSellOrder = () => {
    const productId = intermediateMaterials.find(
      (item) => item.name === selectedMaterial
    ).id;
    submitSellOrder({ productId, price: buyPrice, quantity: buyCount })
      .then((res) => res.data)
      .then((data) => {
        toast.success("سفارش فروش با موفقیت ثبت شد.");
        setSellOrderModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getIntermediateMaterials()
      // getRawMaterials()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        // setIntermediateMaterials([
        //   ...data.result.myRegion,
        //   ...data.result.otherRegions,
        // ]);
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
        setBuyOrders(data.result.filter((item) => item.orderType === "SELL"));
        setSellOrders(data.result.filter((item) => item.orderType === "BUY"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const currentOrders = activeTab === "buy" ? buyOrders : sellOrders;

  const handleSendSellOffer = (id) => {
    sendOffer({ orderId: id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
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
      <div className="trade-filter">
        <div className="trade-filter__tabs">
          <div
            onClick={() => setActiveTab("buy")}
            className={classNames("trade-filter__tab trade-filter__tab-buy", {
              "trade-filter__tab-buy--active": activeTab === "buy",
            })}
          >
            خرید
          </div>
          <div
            onClick={() => setActiveTab("sell")}
            className={classNames("trade-filter__tab trade-filter__tab-sell", {
              "trade-filter__tab-sell--active": activeTab === "sell",
            })}
          >
            فروش
          </div>
        </div>
        <div className="trade-filter__inputs-wrapper">
          <select
            onChange={(e) => {
              setSelectedMaterial(e.target.value);
            }}
            value={selectedMaterial}
            className="trade-filter__select"
          >
            <option disabled selected>
              انتخاب کالا
            </option>
            {intermediateMaterials.map((material) => (
              <option value={material.name}>{material.name}</option>
            ))}
          </select>
          <select className="trade-filter__select">
            <option disabled selected>
              انتخاب منطقه
            </option>
            <option>منطقه ۱</option>
            <option>منطقه ۲</option>
            <option>منطقه ۳</option>
            <option>منطقه ۴</option>
            <option>منطقه ۵</option>
            <option>منطقه ۶</option>
            <option>منطقه ۷</option>
            <option>منطقه ۸</option>
          </select>
        </div>
        <div>محدوده قیمت:</div>
        <div className="trade-filter__inputs-wrapper">
          <div className="trade-filter__input-wrapper">
            <label>
              از:
              <input type="number" className="trade-filter__input" />
            </label>
          </div>
          <div className="trade-filter__input-wrapper">
            <label>
              تا:
              <input type="number" className="trade-filter__input" />
            </label>
          </div>
        </div>
        <div>محدوده تعداد:</div>
        <div className="trade-filter__inputs-wrapper">
          <div className="trade-filter__input-wrapper">
            <label>
              از:
              <input type="number" className="trade-filter__input" />
            </label>
          </div>
          <div className="trade-filter__input-wrapper">
            <label>
              تا:
              <input type="number" className="trade-filter__input" />
            </label>
          </div>
        </div>
        <div className="trade-filter__table-wrapper">
          <table className="trade-filter__table">
            <thead>
              <tr>
                <td>تعداد</td>
                <td>قیمت</td>
                <td>منطقه</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((row) => (
                <tr>
                  <td>{row.quantity}</td>
                  <td>{row.unitPrice}</td>
                  <td>1</td>
                  <td>
                    {activeTab === "buy" && (
                      <button
                        className="trade-filter__buy-btn"
                        onClick={() => setBuyOfferModalOpen(true)}
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
        <div className="trade-filter__create-order">
          {activeTab === "buy" && (
            <Button
              onClick={() => setBuyOrderModalOpen(true)}
              className="trade-filter__buy-btn"
              disabled={!selectedMaterial}
            >
              ثبت سفارش خرید
            </Button>
          )}
          {activeTab === "sell" && (
            <Button
              onClick={() => setSellOrderModalOpen(true)}
              className="trade-filter__sell-btn"
              disabled={!selectedMaterial}
            >
              ثبت سفارش فروش
            </Button>
          )}
        </div>
      </div>
      <Modal
        title={<img src={tradeModalTitle} alt="trade" />}
        open={buyOrderModalOpen}
        onClose={() => setBuyOrderModalOpen(false)}
      >
        <div>ثبت سفارش خرید</div>
        <BasicInput
          label={"چند واحد می‌خوای بخری؟"}
          type="number"
          value={buyCount}
          onChange={(e) => setBuyCount(e.target.value)}
        />
        <BasicInput
          label={"هر واحد رو حداکثر با چه قیمتی می‌خوای بخری؟"}
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />
        <div>هزینه خرید کالاها: {buyCount * buyPrice}</div>
        <Button onClick={handleSubmitBuyOrder}>تایید خرید</Button>
      </Modal>
      <Modal
        title={<img src={tradeModalTitle} alt="trade" />}
        open={sellOrderModalOpen}
        onClose={() => setSellOrderModalOpen(false)}
      >
        <div>ثبت سفارش فروش</div>
        <BasicInput
          label={"چند واحد می‌خوای بفروشی؟"}
          type="number"
          value={sellCount}
          onChange={(e) => setSellCount(e.target.value)}
        />
        <BasicInput
          label={"هر واحد رو حداقل با چه قیمتی می‌خوای بفروشی؟"}
          type="number"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
        />
        <div>درآمد فروش کالاها: </div>
        <Button onClick={handleSubmitSellOrder} type={"error"}>
          تایید فروش
        </Button>
      </Modal>
      <Modal
        title={<img src={tradeModalTitle} alt="trade" />}
        open={sellOfferModalOpen}
        onClose={() => setSellOfferModalOpen(false)}
      >
        <div>ثبت پیشنهاد فروش</div>
        <BasicInput
          label={"چند واحد می‌خوای بفروشی؟"}
          type="number"
          value={sellCount}
          onChange={(e) => setSellCount(e.target.value)}
        />
        <BasicInput
          label={"هر واحد رو حداقل با چه قیمتی می‌خوای بفروشی؟"}
          type="number"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
        />
        <div>درآمد فروش کالاها: </div>
        <Button onClick={handleSubmitSellOrder} type={"error"}>
          تایید فروش
        </Button>
      </Modal>
    </>
  );
}

export default TradeIntermediate;
