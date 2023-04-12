import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getRawMaterials, buyFromGamein } from "../../../../apis/trade";
import sampleImg from "../../../../assets/icons/copper.png";
import cargoImg from "../../../../assets/cargo.png";
import cargoDisableImg from "../../../../assets/cargo-disable.png";
import airplaneImg from "../../../../assets/airplane.png";
import airplaneDisableImg from "../../../../assets/airplane-disable.png";
import gameinShopModalTitle from "../../../../assets/modals/gamein_shop_modal_title.svg";
import "./style.scss";
import { toast } from "react-toastify";
import Modal from "../../../Modal";
import { RAW_MATERIALS } from "../../../../constants/materials";
import { RAW_MATERIALS_TREES } from "../../../../constants/trees";

function ShopInitial() {
  const [data, setData] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [count, setCount] = useState();
  const [open, setOpen] = useState(false);
  const [transport, setTransport] = useState("airplane");

  const transportCost =
    transport === "ship"
      ? selectedMaterial?.shipPrice * count || 0
      : selectedMaterial?.planePrice * count || 0;

  const productCost = count * selectedMaterial?.price || 0;

  const totalCost = transportCost + productCost || 0;

  useEffect(() => {
    getRawMaterials()
      .then((res) => res.data.result)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBuyRawMaterial = () => {
    if (!count || !selectedMaterial) {
      return;
    }
    buyFromGamein({
      productId: selectedMaterial?.id,
      quantity: count,
      shippingMethod: transport === "airplane" ? "PLANE" : "SHIP",
    })
      .then((res) => res.data)
      .then((data) => {
        toast.success("ماده اولیه با موفقیت خریداری شد.");
        setOpen(false);
        console.log(data);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده است."
        );
        console.log(error);
      });
  };

  return (
    <>
      <div className="shop-initial">
        <div className="shop-initial__materials-list">
          {data?.myRegion?.length > 0 && (
            <>
              <div>موجود در منطقه من</div>
              <div className="shop-initial__list">
                {data?.myRegion?.map((material) => (
                  <div
                    onClick={() => setSelectedMaterial(material)}
                    className={classNames("shop-initial__material", {
                      "shop-initial__material--active":
                        material.name === selectedMaterial?.name,
                    })}
                  >
                    <img
                      className="shop-initial__material-img"
                      src={RAW_MATERIALS[material.name]?.icon || sampleImg}
                      alt={material.name}
                    />
                    <div className="shop-initial__material-name">
                      {material.name}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {data?.otherRegions?.length > 0 && (
            <>
              <div>موجود در سایر مناطق</div>
              <div className="shop-initial__list">
                {data?.otherRegions?.map((material) => (
                  <div
                    onClick={() => setSelectedMaterial(material)}
                    className={classNames("shop-initial__material", {
                      "shop-initial__material--active":
                        material.name === selectedMaterial?.name,
                    })}
                  >
                    <img
                      className="shop-initial__material-img"
                      src={RAW_MATERIALS[material.name]?.icon || sampleImg}
                      alt={material.name}
                    />
                    <div className="shop-initial__material-name">
                      {material.name}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {selectedMaterial && (
          <div className="shop-initial__preview">
            <img
              className="shop-initial__preview-img"
              src={RAW_MATERIALS_TREES[selectedMaterial?.name]?.icon || sampleImg}
              alt="selected material"
            />
            <div className="shop-initial__preview-price">
              قیمت هر واحد: {selectedMaterial?.price} جی‌کوین
            </div>
            <div className="shop-initial__preview-btns">
              <button
                onClick={() => setOpen(true)}
                className="shop-initial__preview-btn-buy"
              >
                خرید
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setCount(null);
        }}
        title={<img src={gameinShopModalTitle} alt="gamein shop" />}
      >
        <img
          className="shop-modal__img"
          src={RAW_MATERIALS[selectedMaterial?.name]?.icon || sampleImg}
          alt="selected material"
        />
        <div className="shop-modal__name">
          {selectedMaterial?.name || "Copper"}
        </div>
        <div className="shop-modal__help-text">
          مواد اولیه از نزدیکترین منطقه به شما خریداری می‌شن.
        </div>
        <div className="shop-modal__unit">چند واحد می‌خوای بخری؟</div>
        <input
          value={count}
          onChange={(e) => setCount(e.target.value)}
          type="number"
          step={100}
          min={0}
          className="shop-modal__input"
          placeholder="مثلا ۵۰۰"
        />
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
              src={transport === "airplane" ? airplaneImg : airplaneDisableImg}
              alt="airplane"
            />
            <div className="shop-modal__transport-text">
              هواپیما
              <br />
              در {selectedMaterial?.planeDuration} روز
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
              در {selectedMaterial?.shipDuration} روز
            </div>
          </div>
        </div>
        <div className="shop-modal__summary-text">
          هزینه خرید کالاها: {productCost}
        </div>
        <div className="shop-modal__summary-text">
          هزینه حمل و نقل: {transportCost}
        </div>
        <div className="shop-modal__summary-text">جمع کل: {totalCost}</div>
        <div className="shop-modal__seperator"></div>
        <div className="shop-modal__summary-text">
          دارایی فعلی: {data?.balance}{" "}
        </div>
        <div className="shop-modal__summary-text">
          دارایی پس از خرید: {data?.balance - totalCost}
        </div>
        <button
          onClick={handleBuyRawMaterial}
          className="shop-modal__confirm-buy-btn"
          disabled={!count || count === "0"}
        >
          تایید خرید
        </button>
      </Modal>
    </>
  );
}

export default ShopInitial;
