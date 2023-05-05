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
import { formatPrice } from "../../../../utils/formatters";
import { useRecoilValue } from "recoil";
import { balanceState } from "../../../../store/team-info";
import useUpdateBalance from "../../../../hooks/useUpdateBalance";
import NumberInput from "../../../NumberInput";
import TransportEmptyState from "../../../TansportEmptyState";
import Button from "../../../Button";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
function Shop() {
  const [data, setData] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [transport, setTransport] = useState("airplane");

  const balance = useRecoilValue(balanceState);
  const updateBalance = useUpdateBalance();

  const transportCost =
    transport === "ship"
      ? selectedMaterial?.shipPrice +
        Math.floor(
          (selectedMaterial?.shipPrice / 100) *
            Math.sqrt(
              count * selectedMaterial?.unitVolume * selectedMaterial?.distance
            )
        )
      : selectedMaterial?.planePrice +
        Math.floor(
          (selectedMaterial?.planePrice / 100) *
            Math.sqrt(
              count * selectedMaterial?.unitVolume * selectedMaterial?.distance
            )
        );

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
        toast.success(t`ماده اولیه با موفقیت خریداری شد.`);
        setOpen(false);
        setCount(0);
        updateBalance();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده است.`
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
              <div>
<Trans> موجود در منطقه من
</Trans>                </div>
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
              <div><Trans>موجود در سایر مناطق</Trans></div>
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
          {selectedMaterial && (
            <div className="shop-initial__preview">
              <img
                className="shop-initial__preview-img"
                src={
                  RAW_MATERIALS_TREES[selectedMaterial?.name]?.icon || sampleImg
                }
                alt="selected material"
              />
            </div>
          )}
        </div>
        <div className="shop-initial__buy">
          {!selectedMaterial && <div><Trans>یک ماده را انتخاب کنید.</Trans></div>}
          {selectedMaterial && (
            <>
              <div className="shop-initial__preview-price">
                <Trans>قیمت هر واحد:</Trans> {formatPrice(selectedMaterial?.price)}  {plural(selectedMaterial?.price, {
  one: `جی‌کوین`,
  other: `جی‌کوین`
})}
              </div>
              <Button
                onClick={() => setOpen(true)}
                className="shop-initial__preview-btn-buy"
              >
                <Trans>خرید</Trans>
              </Button>
            </>
          )}
        </div>
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
         <Trans> مواد اولیه از نزدیکترین منطقه به شما خریداری می‌شن.</Trans>
        </div>
        <div className="shop-modal__unit">
        <Trans>  چند واحد می‌خوای بخری؟</Trans>
          </div>
        <NumberInput
          value={count}
          onChange={(value) => setCount(value)}
          min={0}
          className="shop-modal__input"
        />
        {selectedMaterial?.distance > 0 ? (
          <>
            <div className="shop-modal__transport-name">
              <Trans>با چه وسیله‌ای ارسال بشه؟</Trans>
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
                    transport === "airplane" ? airplaneImg : airplaneDisableImg
                  }
                  alt="airplane"
                />
                <div className="shop-modal__transport-text">
                 <Trans> هواپیما</Trans>
                  <br />
                  <Trans>در {selectedMaterial?.planeDuration * 8} ثانیه</Trans>
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
                 <Trans> کشتی</Trans>
                  <br />
                  <Trans>در {selectedMaterial?.shipDuration * 8} ثانیه</Trans>
                </div>
              </div>
            </div>
          </>
        ) : (
          <TransportEmptyState />
        )}
        <div className="shop-modal__summary-text">
         <Trans> هزینه خرید کالاها:</Trans> {formatPrice(productCost)}
        </div>
        <div className="shop-modal__summary-text">
         <Trans> هزینه حمل و نقل:</Trans> {formatPrice(transportCost)}
        </div>
        <div className="shop-modal__summary-text">
         <Trans> جمع کل:</Trans> {formatPrice(totalCost)}
        </div>
        <div className="shop-modal__seperator"></div>
        <div className="shop-modal__summary-text">
         <Trans>دارایی فعلی:</Trans> {formatPrice(balance)}{" "}
        </div>
        <div className="shop-modal__summary-text">
         <Trans> دارایی پس از خرید:</Trans> {formatPrice(balance - totalCost)}
        </div>
        <button
          onClick={handleBuyRawMaterial}
          className="shop-modal__confirm-buy-btn"
          disabled={!count || count === "0"}
        >
          <Trans>تایید خرید</Trans>
        </button>
      </Modal>
    </>
  );
}

export default Shop;
