import React, { useEffect, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import gameinGearLogo from "../../../../assets/gamein_gear_gray.svg";
import Button from "../../../Button";
import Modal from "../../../Modal";
import { getProductRequirements } from "../../../../apis/production";
import BasicInput from "../../../BasicInput";

import sampleImg from "../../../../assets/sample_bom.png";
import setupProductionLineModalTitle from "../../../../assets/modals/setup_production_line_modal_title.svg";

import "./style.scss";

function Line({ status }) {
  const [setupLineModelOpen, setSetupLineModelOpen] = useState(false);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getProductRequirements({ productId: 6 })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className={`line line--${status}`}>
        <div
          className="line__progress"
          style={{ width: status === "IN_PROGRESS" ? `${60}%` : 0 }}
        ></div>
        <div className="line__header">
          <div>خط تولید(نام پکیج)</div>
          <img src={gameinGearLogo} alt="gamein gear logo" />
        </div>

        {status === "NOT_INITIAL" && (
          <div className="line__body">
            <div>برای تولید کالا،‌ خط تولیدت رو پیش راه‌اندازی کن!</div>
            <Button type="info">پیش راه‌اندازی</Button>
          </div>
        )}
        {status === "OFF" && (
          <div className="line__body">
            <div>برای تولید کالا،‌ خط تولیدت رو راه‌اندازی کن!</div>
            <Button
              type="info"
              onClick={() => {
                setSetupLineModelOpen(true);
              }}
            >
              راه‌اندازی
            </Button>
          </div>
        )}
        {status === "IN_PROGRESS" && (
          <div className="line__body">
            <div>در حال تولید (نام کالا)</div>
            <div>۶۰٪</div>
            <div>۶۰۰ از ۱۰۰۰</div>
          </div>
        )}
        {status === "DONE" && (
          <div className="line__body">
            <div>تولید (نام کالا) انجام شد!</div>
            <Button type="info-reverse">باشه</Button>
          </div>
        )}
      </div>
      <Modal
        className="setup-line-modal"
        open={setupLineModelOpen}
        onClose={() => setSetupLineModelOpen(false)}
        title={
          <img
            src={setupProductionLineModalTitle}
            alt="setup production line"
          />
        }
      >
        <div className="setup-line-modal__wrapper">
          <div className="setup-line-modal__column">
            <div className="setup-line-modal__column-title">انتخاب کالا</div>
            <select
              className="trade-filter__select setup-line-modal__choose-product"
              onChange={(e) => setProduct(e.target.value)}
            >
              <option disabled selected>
                انتخاب کالا
              </option>
              <option>copper</option>
              <option>cobalt</option>
            </select>
            <img
              className="setup-line-modal__img"
              src={sampleImg}
              alt="sample"
            />
            <div className="setup-line-modal__r-and-d-warning">
              <div className="setup-line-modal__r-and-d-warning-top">
                <ErrorOutlineOutlinedIcon />
                کارخانه‌ی شما فناوری لازم را برای تولید این کالا ندارد. برای
                اضافه کردن این فناوری، به بخش تحقیق و توسعه بروید.
              </div>
              <Button className="setup-line-modal__r-and-d-warning-btn">
                تحقیق و توسعه
              </Button>
            </div>
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
            <div className="setup-line-modal__storage-description">
              برای تولید {quantity} عدد {product} به مواد اولیه‌ی زیر نیاز
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
                  <tr>
                    <td>کالای ۱</td>
                    <td>۱۰۰ واحد</td>
                    <td>۱۵۰ عدد</td>
                    <td className="setup-line-modal__storage-icon">
                      <CheckIcon style={{ color: "#009054" }} />
                    </td>
                  </tr>
                  <tr>
                    <td>کالای ۲</td>
                    <td>۲۰ واحد</td>
                    <td>۱۰ عدد</td>
                    <td className="setup-line-modal__storage-icon">
                      <CloseIcon style={{ color: "#D63F26" }} />
                    </td>
                  </tr>
                  <tr>
                    <td>کالای ۳</td>
                    <td>۳۰ واحد</td>
                    <td>۲۰ عدد</td>
                    <td className="setup-line-modal__storage-icon">
                      <CloseIcon style={{ color: "#D63F26" }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="setup-line-modal__storage-warning">
              <div className="setup-line-modal__storage-warning-top">
                <ErrorOutlineOutlinedIcon />
                موجودی برخی مواد اولیه در انبار شما کافی نیست. برای تامین آنها،
                به فروشگاه گیمین بروید.
              </div>
              <Button className="setup-line-modal__storage-warning-btn">
                خرید از فروشگاه گیمین
              </Button>
            </div>
          </div>
          <div className="setup-line-modal__column">
            <div className="setup-line-modal__column-title">
              تایید و شروع تولید
            </div>
            <div className="setup-line-modal__confirm-header">
              <div className="setup-line-modal__confirm-title">نرخ تولید: </div>
              <div className="setup-line-modal__confirm-value">
                {"تعداد"} کالا در روز
              </div>
              <div className="setup-line-modal__confirm-title">
                مدت زمان مورد نیاز:{" "}
              </div>
              <div className="setup-line-modal__confirm-value">
                {"تعداد"} روز
              </div>
              <div className="setup-line-modal__confirm-title">
                هزینه تولید:
              </div>
              <div className="setup-line-modal__confirm-value">
                {"تعداد"} {"واحد پول"}
              </div>
            </div>
            <div className="setup-line-modal__confirm-footer">
              <div>
                دارایی فعلی: {"تعداد"} {"واحد پول"}
              </div>
              <div>
                دارایی پس از تولید: {"تعداد"} {"واحد پول"}
              </div>
              <Button className="setup-line-modal__confirm-btn">
                شروع تولید
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Line;
