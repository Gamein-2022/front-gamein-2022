import React, { useState, useEffect } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../../../Modal";
import Button from "../../../Button";

import BasicInput from "../../../BasicInput";

import sampleImg from "../../../../assets/sample_bom.png";
import setupProductionLineModalTitle from "../../../../assets/modals/setup_production_line_modal_title.svg";
import setupAssemblyLineModalTitle from "../../../../assets/modals/setup_assembly_line_modal_title.svg";
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
import { useRecoilState } from "recoil";
import {
  rightTableOpen,
  rightTableTab,
  shopInnerTab,
} from "../../../../store/tabs";
import { RIGHT_TABLE_TABS, SHOP_INNER_TABS } from "../../../../constants/tabs";
import useUpdateBalance from "../../../../hooks/useUpdateBalance";

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

  const navigate = useNavigate();
  const updateBalance = useUpdateBalance();

  const [rightTab, setRightTab] = useRecoilState(rightTableTab);
  const [rightOpen, setRightOpen] = useRecoilState(rightTableOpen);
  const [shopTab, setShopTab] = useRecoilState(shopInnerTab);

  useEffect(() => {
    getLineAvailableProducts({ id: lineId })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setInfo(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
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
      });
  };

  return (
    <Modal
      className="setup-line-modal"
      open={open}
      onClose={onClose}
      title={
        <img
          src={
            modalType === "PRODUCTION"
              ? setupProductionLineModalTitle
              : setupAssemblyLineModalTitle
          }
          alt="setup line"
        />
      }
    >
      <div className="setup-line-modal__wrapper">
        <div className="setup-line-modal__body">
          <div className="setup-line-modal__column">
            <div className="setup-line-modal__column-title">انتخاب کالا</div>
            <select
              className="trade-filter__select setup-line-modal__choose-product"
              onChange={(e) =>
                setProduct(
                  info.find((item) => item.product.name === e.target.value)
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
                  INTERMEDIATE_MATERIALS_LEVEL_ONE_TREES[product?.product?.name]
                    ?.icon ||
                  INTERMEDIATE_MATERIALS_LEVEL_TWO_TREES[product?.product?.name]
                    ?.icon ||
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
            <BasicInput
              label="تعداد:"
              type="number"
              min="0"
              step="10"
              wrapperClassName="setup-line-modal__quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {quantity > 0 && product && (
              <>
                <div className="setup-line-modal__storage-description">
                  برای {modalType === "PRODUCTION" ? "تولید" : "مونتاژ"}{" "}
                  {quantity} عدد {product?.name} به مواد اولیه‌ی زیر نیاز دارید:
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
                          <td>{req.numberPerOne * quantity}</td>
                          <td>{req.inStorage}</td>
                          <td className="setup-line-modal__storage-icon">
                            {req.inStorage >= req.numberPerOne * quantity ? (
                              <CheckIcon style={{ color: "#009054" }} />
                            ) : (
                              <CloseIcon style={{ color: "#D63F26" }} />
                            )}
                          </td>
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
                {((product?.product?.productionRate * 60) / 8 || 0).toFixed(0)}{" "}
                کالا در دقیقه
              </div>
              <div className="setup-line-modal__confirm-title">
                مدت زمان مورد نیاز:{" "}
              </div>
              <div className="setup-line-modal__confirm-value">
                {(quantity / (product?.product?.productionRate || 1)).toFixed(
                  2
                ) || 0}{" "}
                روز
              </div>
              <div className="setup-line-modal__confirm-title">
                هزینه {lineTypeString}:
              </div>
              <div className="setup-line-modal__confirm-value">
                {formatPrice(
                  product?.basePrice + product?.product?.price * quantity || 0
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
                  کارخانه‌ی شما فناوری لازم را برای {lineTypeString} این کالا
                  ندارد. برای اضافه کردن این فناوری، به بخش تحقیق و توسعه بروید.
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
                    (product?.basePrice + product?.product?.price * quantity) ||
                    0
                )}{" "}
                {"جی‌کوین"}
              </div>
              <Button
                disabled={quantity == 0 || !product}
                onClick={handleSubmit}
                className="setup-line-modal__confirm-btn"
              >
                شروع {lineTypeString}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Off;
