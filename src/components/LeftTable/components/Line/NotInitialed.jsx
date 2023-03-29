import React, { useState, useEffect } from "react";
import Button from "../../../Button";
import Modal from "../../../Modal";

import setupProductionLineModalTitle from "../../../../assets/modals/setup_production_line_modal_title.svg";
import setupAssemblyLineModalTitle from "../../../../assets/modals/setup_assembly_line_modal_title.svg";
import { getAvailableProducts, initLine } from "../../../../apis/production";
import { toast } from "react-toastify";

function NotInitialed({ modalType, open, onClose, lineId, updateLines }) {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState();

  useEffect(() => {
    getAvailableProducts()
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
    initLine({ productId: selectedProduct, lineId })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("خط تولید با موفقیت راه‌اندازی شد.");
        updateLines();
        onClose();
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 404) {
          toast.error(error?.response?.data?.message);
          onClose();
          updateLines();
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
              modalType === "production"
                ? setupProductionLineModalTitle
                : setupAssemblyLineModalTitle
            }
            alt="init line"
          />
        }
      >
        <div className="init-line-modal">
          <div className="init-line-modal__img"></div>
          <p className="init-line-modal__description">
            می‌خوای این خط تولید، برای تولید کدوم دسته از محصولات میانی سطح یک
            استفاده بشه؟
            <br />
            (این تنظیمات فقط یک بار انجام میشه و غیر قابل تغییره)
          </p>
          <select
            onChange={(e) => {
              setselectedProduct(e.target.value);
            }}
            value={selectedProduct}
            className="trade-filter__select"
          >
            <option disabled selected>
              انتخاب
            </option>
            {availableProducts.map((product) => (
              <option value={product.id}>{product.name}</option>
            ))}
          </select>
          <div className="init-line-modal__available-products">
            <div className="init-line-modal__available-products-title">
              محصولات قابل تولید در این دسته:
            </div>
            <div className="init-line-modal__product">نام محصول</div>
            <div className="init-line-modal__product">نام محصول</div>
            <div className="init-line-modal__product">نام محصول</div>
          </div>
          <Button disabled={!selectedProduct} onClick={handleSubmit}>
            تایید
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default NotInitialed;
