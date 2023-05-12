import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getRawMaterials, buyFromGamein } from "../../../../apis/trade";
import sampleImg from "../../../../assets/materials/unkown_material.svg";
import cargoImg from "../../../../assets/cargo.svg";
import cargoDisableImg from "../../../../assets/cargo-disable.svg";
import airplaneImg from "../../../../assets/airplane.svg";
import airplaneDisableImg from "../../../../assets/airplane-disable.svg";
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
import GameinLoading from "../../../GameinLoading";

function Shop() {
  const [data, setData] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [transport, setTransport] = useState("airplane");
  const [actionLoading, setActionLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const balance = useRecoilValue(balanceState);
  const updateBalance = useUpdateBalance();

  const transportCost =
    (selectedMaterial?.distance > 0
      ? transport === "ship"
        ? selectedMaterial?.shipPrice +
          selectedMaterial?.shipVariablePrice *
            Math.floor(
              Math.sqrt(
                count *
                  selectedMaterial?.unitVolume *
                  selectedMaterial?.distance
              )
            )
        : selectedMaterial?.planePrice +
          selectedMaterial?.planeVariablePrice *
            Math.floor(
              Math.sqrt(
                count *
                  selectedMaterial?.unitVolume *
                  selectedMaterial?.distance
              )
            )
      : selectedMaterial?.shipPrice) || 0;
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
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const handleBuyRawMaterial = () => {
    if (!count || !selectedMaterial) {
      return;
    }
    setActionLoading(true);
    buyFromGamein({
      productId: selectedMaterial?.id,
      quantity: count,
      shippingMethod: transport === "airplane" ? "PLANE" : "SHIP",
    })
      .then((res) => res.data)
      .then((data) => {
        toast.success("ماده اولیه با موفقیت خریداری شد.");
        setOpen(false);
        setCount(0);
        updateBalance();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده است."
        );
        console.log(error);
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  return (
    <>
      <div className="shop-initial">
        {pageLoading && <GameinLoading size={32} />}
        {!pageLoading && (
          <>
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
                          {material.prettyName}
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
                          {material.prettyName}
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
                      RAW_MATERIALS_TREES[selectedMaterial?.name]?.icon ||
                      sampleImg
                    }
                    alt="selected material"
                  />
                </div>
              )}
            </div>
            <div className="shop-initial__buy">
              {!selectedMaterial && <div>یک ماده را انتخاب کنید.</div>}
              {selectedMaterial && (
                <>
                  <div className="shop-initial__preview-price">
                    قیمت هر واحد: {formatPrice(selectedMaterial?.price)} جی‌کوین
                  </div>
                  <Button
                    onClick={() => setOpen(true)}
                    className="shop-initial__preview-btn-buy"
                  >
                    خرید
                  </Button>
                </>
              )}
            </div>
          </>
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
          {selectedMaterial?.prettyName || ""}
        </div>
        <div className="shop-modal__help-text">
          مواد اولیه از نزدیکترین منطقه به شما خریداری می‌شن.
        </div>
        <div className="shop-modal__unit">چند واحد می‌خوای بخری؟</div>
        <NumberInput
          value={count}
          onChange={(value) => setCount(value)}
          min={0}
          className="shop-modal__input"
        />
        {selectedMaterial?.distance > 0 ? (
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
                    transport === "airplane" ? airplaneImg : airplaneDisableImg
                  }
                  alt="airplane"
                />
                <div className="shop-modal__transport-text">
                  هواپیما
                  <br />
                  در {selectedMaterial?.planeDuration} ثانیه
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
                  در {selectedMaterial?.shipDuration} ثانیه
                </div>
              </div>
            </div>
          </>
        ) : (
          <TransportEmptyState />
        )}
        <div className="shop-modal__summary-text">
          هزینه خرید کالاها: {formatPrice(productCost)}
        </div>
        <div className="shop-modal__summary-text">
          هزینه حمل و نقل: {formatPrice(transportCost)}
        </div>
        <div className="shop-modal__summary-text">
          جمع کل: {formatPrice(totalCost)}
        </div>
        <div className="shop-modal__seperator"></div>
        <div className="shop-modal__summary-text">
          دارایی فعلی: {formatPrice(balance)}{" "}
        </div>
        <div className="shop-modal__summary-text">
          دارایی پس از خرید: {formatPrice(balance - totalCost)}
        </div>
        <button
          onClick={handleBuyRawMaterial}
          className="shop-modal__confirm-buy-btn"
          disabled={
            actionLoading || !count || count === "0" || Number(count) <= 0
          }
        >
          تایید خرید
        </button>
      </Modal>
    </>
  );
}

export default Shop;
