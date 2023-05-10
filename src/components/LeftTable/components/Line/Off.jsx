import React, { useState, useEffect } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../../../Modal";
import Button from "../../../Button";

import sampleImg from "../../../../assets/sample_bom.png";
import cargoImg from "../../../../assets/cargo.png";
import cargoDisableImg from "../../../../assets/cargo-disable.png";
import airplaneImg from "../../../../assets/airplane.png";
import airplaneDisableImg from "../../../../assets/airplane-disable.png";
import gameinShopModalTitle from "../../../../assets/modals/gamein_shop_modal_title.svg";
import setupProductionLineModalTitle from "../../../../assets/modals/setup_production_line_modal_title.svg";
import setupAssemblyLineModalTitle from "../../../../assets/modals/setup_assembly_line_modal_title.svg";
import setupRecycleLineModalTitle from "../../../../assets/modals/recycle_modal_title.svg";
import {
  getLineAvailableProducts,
  startLine,
} from "../../../../apis/production";
import { formatPrice } from "../../../../utils/formatters";
import { toast } from "react-toastify";
import {
  FINAL_MATERIALS_TREES,
  INTERMEDIATE_MATERIALS_LEVEL_ONE_TREES,
  INTERMEDIATE_MATERIALS_LEVEL_TWO_TREES,
} from "../../../../constants/trees";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  rightTableOpen,
  rightTableTab,
  shopInnerTab,
} from "../../../../store/tabs";
import { RIGHT_TABLE_TABS, SHOP_INNER_TABS } from "../../../../constants/tabs";
import useUpdateBalance from "../../../../hooks/useUpdateBalance";
import classNames from "classnames";
import { RAW_MATERIALS } from "../../../../constants/materials";
import { balanceState } from "../../../../store/team-info";
import { buyFromGamein } from "../../../../apis/trade";
import NumberInput from "../../../NumberInput";
import TransportEmptyState from "../../../TansportEmptyState";
import GameinLoading from "../../../GameinLoading";

function Off({
  open,
  updateLines,
  onClose,
  modalType,
  lineTypeString,
  lineId,
  group,
}) {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const [info, setInfo] = useState();

  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [transport, setTransport] = useState("airplane");
  const [selectedMaterial, setSelectedMaterial] = useState({});

  const [pageLoading, setPageLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const navigate = useNavigate();
  const updateBalance = useUpdateBalance();

  const [rightTab, setRightTab] = useRecoilState(rightTableTab);
  const [rightOpen, setRightOpen] = useRecoilState(rightTableOpen);
  const [shopTab, setShopTab] = useRecoilState(shopInnerTab);

  const balance = useRecoilValue(balanceState);

  const transportCost =
    selectedMaterial?.distance > 0
      ? transport === "ship"
        ? selectedMaterial?.shipPrice +
          selectedMaterial?.shipVariablePrice *
            Math.floor(
              Math.sqrt(
                count *
                  selectedMaterial?.unitVolume *
                  selectedMaterial?.distance || 0
              )
            )
        : selectedMaterial?.planePrice +
          selectedMaterial?.planeVariablePrice *
            Math.floor(
              Math.sqrt(
                count *
                  selectedMaterial?.unitVolume *
                  selectedMaterial?.distance || 0
              )
            )
      : selectedMaterial?.shipPrice;

  const productCost = count * selectedMaterial?.minPrice || 0;

  const totalCost = transportCost + productCost || 0;

  useEffect(() => {
    setPageLoading(true);
    getLineAvailableProducts({ id: lineId })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setInfo(data.result);
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
    buyFromGamein({
      productId: selectedMaterial?.id,
      quantity: count,
      shippingMethod: transport === "airplane" ? "PLANE" : "SHIP",
    })
      .then((res) => res.data)
      .then((data) => {
        toast.success("ماده اولیه با موفقیت خریداری شد.");
        setBuyModalOpen(false);
        setCount(0);
        updateBalance();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده است."
        );
        console.log(error);
      });
  };

  const handleSubmit = () => {
    setActionLoading(true);
    startLine({ lineId, count: quantity, productId: product?.product?.id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(`خط ${lineTypeString} با موفقیت راه‌اندازی شد.`);
        updateLines();
        onClose();
        updateBalance();
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 400) {
          toast.error(error?.response?.data?.message);
          updateLines();
        }
        if (error?.response?.status === 404) {
          toast.error(error?.response?.data?.message);
          updateLines();
        }
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  return (
    <>
      <Modal
        className="setup-line-modal"
        open={open}
        onClose={onClose}
        title={
          <img
            src={
              modalType === "PRODUCTION"
                ? setupProductionLineModalTitle
                : modalType === "RECYCLE"
                ? setupRecycleLineModalTitle
                : setupAssemblyLineModalTitle
            }
            alt="setup line"
          />
        }
      >
        <div className="setup-line-modal__wrapper">
          {pageLoading && <GameinLoading size={32} />}
          {!pageLoading && (
            <>
              <div className="setup-line-modal__body">
                <div className="setup-line-modal__column">
                  <div className="setup-line-modal__column-title">
                    انتخاب کالا
                  </div>
                  <select
                    className="trade-filter__select setup-line-modal__choose-product"
                    onChange={(e) =>
                      setProduct(
                        info.find(
                          (item) => item.product.name === e.target.value
                        )
                      )
                    }
                  >
                    <option disabled selected>
                      انتخاب کالا
                    </option>
                    {info?.map((item) => (
                      <option>{item?.product?.name}</option>
                    ))}
                  </select>
                  {product?.product?.name && (
                    <img
                      className="setup-line-modal__img"
                      src={
                        INTERMEDIATE_MATERIALS_LEVEL_ONE_TREES[
                          product?.product?.name
                        ]?.icon ||
                        INTERMEDIATE_MATERIALS_LEVEL_TWO_TREES[
                          product?.product?.name
                        ]?.icon ||
                        FINAL_MATERIALS_TREES[product?.product?.name]?.icon ||
                        sampleImg
                      }
                      alt="sample"
                    />
                  )}
                </div>
                <div className="setup-line-modal__column">
                  <div className="setup-line-modal__column-title">
                    بررسی موجودی انبار
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: 8 }}>تعداد:</div>
                    <NumberInput
                      step={
                        product?.product?.level === 0
                          ? product.requirements[0].numberPerOne
                          : 1
                      }
                      wrapperClassName="setup-line-modal__quantity"
                      value={quantity}
                      onChange={(value) => setQuantity(value)}
                    />
                  </div>
                  {quantity > 0 && product && (
                    <>
                      <div className="setup-line-modal__storage-description">
                        برای {modalType === "PRODUCTION" ? "تولید" : "مونتاژ"}{" "}
                        {quantity} عدد {product?.name} به مواد اولیه‌ی زیر نیاز
                        دارید:
                      </div>
                      <div className="setup-line-modal__storage-table">
                        <table>
                          <thead>
                            <tr>
                              <td>نام</td>
                              <td>تعداد</td>
                              <td>موجودی انبار</td>
                            </tr>
                          </thead>
                          <tbody>
                            {product?.requirements.map((req) => (
                              <tr>
                                <td>{req.product.name}</td>
                                <td>
                                  {req.product.level === -1
                                    ? (quantity / req.numberPerOne).toFixed(2)
                                    : req.numberPerOne * quantity}
                                </td>
                                <td
                                  style={{
                                    color:
                                      (req.product.level >= 0 &&
                                        req.inStorage >=
                                          req.numberPerOne * quantity) ||
                                      (req.product.level === -1 &&
                                        req.inStorage >=
                                          quantity / req.numberPerOne)
                                        ? "#009054"
                                        : "#D63F26",
                                  }}
                                >
                                  {req.inStorage}
                                </td>
                                {req.product.level <= 0 && (
                                  <td className="setup-line-modal__storage-icon">
                                    {((req.product.level === 0 &&
                                      req.inStorage <
                                        req.numberPerOne * quantity) ||
                                      (req.product.level === -1 &&
                                        req.inStorage <
                                          quantity / req.numberPerOne)) && (
                                      <Button
                                        onClick={() => {
                                          setBuyModalOpen(true);
                                          setSelectedMaterial(req.product);
                                          setCount(
                                            req.numberPerOne * quantity -
                                              req.inStorage
                                          );
                                        }}
                                        className="setup-line-modal__table-buy-btn"
                                      >
                                        خرید
                                      </Button>
                                    )}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
                <div className="setup-line-modal__column">
                  <div className="setup-line-modal__column-title">
                    تایید و شروع {lineTypeString}
                  </div>
                  <div className="setup-line-modal__confirm-header">
                    <div className="setup-line-modal__confirm-title">
                      نرخ {lineTypeString}:{" "}
                    </div>
                    <div className="setup-line-modal__confirm-value">
                      {(
                        (product?.product?.productionRate * 60) / 8 || 0
                      ).toFixed(0)}{" "}
                      کالا در دقیقه
                    </div>
                    <div className="setup-line-modal__confirm-title">
                      مدت زمان مورد نیاز:{" "}
                    </div>
                    <div className="setup-line-modal__confirm-value">
                      {(
                        quantity / (product?.product?.productionRate || 1)
                      ).toFixed(2) * 8 || 0}{" "}
                      ثانیه
                    </div>
                    <div className="setup-line-modal__confirm-title">
                      هزینه {lineTypeString}:
                    </div>
                    <div className="setup-line-modal__confirm-value">
                      {formatPrice(
                        product?.basePrice +
                          product?.product?.price * quantity || 0
                      )}{" "}
                      {"جی‌کوین"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="setup-line-modal__footer">
                <div className="setup-line-modal__column">
                  {product && !product.hasRAndDRequirement && (
                    <div className="setup-line-modal__r-and-d-warning">
                      <div className="setup-line-modal__r-and-d-warning-top">
                        <ErrorOutlineOutlinedIcon />
                        کارخانه‌ی شما فناوری لازم را برای {lineTypeString} این
                        کالا ندارد. برای اضافه کردن این فناوری، به بخش تحقیق و
                        توسعه بروید.
                      </div>
                      <Button
                        onClick={() => navigate("/r-and-d")}
                        className="setup-line-modal__r-and-d-warning-btn"
                      >
                        تحقیق و توسعه
                      </Button>
                    </div>
                  )}
                </div>

                <div className="setup-line-modal__column">
                  {modalType !== "PRODUCTION" && (
                    <div className="setup-line-modal__storage-warning">
                      <div className="setup-line-modal__storage-warning-top">
                        <ErrorOutlineOutlinedIcon />
                        {modalType === "PRODUCTION"
                          ? "موجودی برخی مواد اولیه در انبار شما کافی نیست. برای تامین آنها، به فروشگاه گیمین بروید."
                          : "موجودی برخی کالاها در انبار شما کافی نیست. برای تامین آنها، به بخش تجارت رفته و از تیم‌های دیگر بخرید."}
                      </div>
                      <Button
                        onClick={() => {
                          onClose();
                          setRightOpen(true);
                          if (modalType === "PRODUCTION") {
                            setRightTab(RIGHT_TABLE_TABS.shop);
                            setShopTab(SHOP_INNER_TABS.rawMaterials);
                          } else {
                            setRightTab(RIGHT_TABLE_TABS.deals);
                          }
                        }}
                        className="setup-line-modal__storage-warning-btn"
                      >
                        {modalType === "PRODUCTION"
                          ? "خرید از فروشگاه گیمین"
                          : "تجارت با تیم‌های دیگر"}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="setup-line-modal__column">
                  <div className="setup-line-modal__confirm-footer">
                    <div>
                      دارایی فعلی:{" "}
                      {formatPrice(product?.balance || info?.[0]?.balance || 0)}{" "}
                      {"جی‌کوین"}
                    </div>
                    <div>
                      دارایی پس از {lineTypeString}:{" "}
                      {formatPrice(
                        product?.balance -
                          (product?.basePrice +
                            product?.product?.price * quantity) || 0
                      )}{" "}
                      {"جی‌کوین"}
                    </div>
                    <Button
                      disabled={
                        quantity == 0 ||
                        !product ||
                        !product.hasRAndDRequirement ||
                        actionLoading
                      }
                      onClick={handleSubmit}
                      className="setup-line-modal__confirm-btn"
                    >
                      شروع {lineTypeString}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
      <Modal
        open={buyModalOpen}
        onClose={() => {
          setBuyModalOpen(false);
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
        <NumberInput
          value={count}
          onChange={(value) => setCount(value)}
          step={1}
          className="shop-modal__input"
          placeholder="مثلا ۵۰۰"
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
          disabled={!count || count === "0"}
        >
          تایید خرید
        </button>
      </Modal>
    </>
  );
}

export default Off;
