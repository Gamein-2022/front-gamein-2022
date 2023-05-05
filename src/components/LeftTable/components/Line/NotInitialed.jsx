import React, { useState, useEffect } from "react";
import Button from "../../../Button";
import Modal from "../../../Modal";

import setupProductionLineModalTitle from "../../../../assets/modals/setup_production_line_modal_title.svg";
import setupAssemblyLineModalTitle from "../../../../assets/modals/setup_assembly_line_modal_title.svg";
import { getLineGroups, initLine } from "../../../../apis/production";
import { toast } from "react-toastify";
import {
  FINAL_MATERIALS,
  INTERMEDIATE_MATERIALS_LEVEL_ONE,
  INTERMEDIATE_MATERIALS_LEVEL_TWO,
  RAW_MATERIALS,
} from "../../../../constants/materials";

import sampleImg from "../../../../assets/icons/copper.png";
import { GROUPS } from "../../../../constants/groups";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro"

function NotInitialed({ modalType, open, onClose, lineId, updateLines }) {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState();

  const stringType = modalType === "PRODUCTION" ? t`تولید` :t`مونتاژ`;

  useEffect(() => {
    getLineGroups({ t: modalType === "PRODUCTION" ? 0 : 1 })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setAvailableProducts(data?.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    initLine({ group: selectedProduct?.name, lineId })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(t`خط ${stringType} با موفقیت راه‌اندازی شد.`);
        updateLines();
        onClose();
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 404) {
          toast.error(error?.response?.data?.message);
          onClose();
          updateLines();
        } else {
          toast.error(
            error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
          );
        }
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={
          <img
            src={
              modalType === "PRODUCTION"
                ? setupProductionLineModalTitle
                : setupAssemblyLineModalTitle
            }
            alt="init line"
          />
        }
      >
        <div className="init-line-modal">
          <p className="init-line-modal__description">
           <Trans> می‌خوای این خط {stringType}، برای {stringType} کدوم دسته از محصولات
            استفاده بشه؟</Trans>
            <br />
<Trans>            (این تنظیمات فقط یک بار انجام میشه و غیر قابل تغییره)
</Trans>          </p>
          <select
            onChange={(e) => {
              setselectedProduct(
                availableProducts.find((item) => item?.name === e.target.value)
              );
            }}
            value={selectedProduct?.id}
            className="trade-filter__select"
          >
            <option disabled selected>
              انتخاب
            </option>
            {availableProducts.map((product) => (
              <option value={product.name}>{GROUPS[product.name] || product.name}</option>
            ))}
          </select>
          {selectedProduct && (
            <div className="init-line-modal__available-products">
              <div className="init-line-modal__available-products-title">
                محصولات قابل {stringType} در این دسته:
              </div>
              <div className="init-line-modal__product-list">
                {selectedProduct?.products?.map((product) => (
                  <img
                    className="init-line-modal__product-img"
                    src={
                      RAW_MATERIALS[product?.name]?.icon ||
                      INTERMEDIATE_MATERIALS_LEVEL_ONE[product?.name]?.icon ||
                      INTERMEDIATE_MATERIALS_LEVEL_TWO[product?.name]?.icon ||
                      FINAL_MATERIALS[product?.name]?.icon ||
                      sampleImg
                    }
                    alt=""
                  />
                ))}
              </div>
            </div>
          )}
          <Button disabled={!selectedProduct} onClick={handleSubmit}>
            تایید
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default NotInitialed;
