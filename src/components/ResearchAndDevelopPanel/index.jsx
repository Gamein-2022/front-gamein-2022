import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { dataState } from "../../store/research-and-develop";
import {
  getSubjectInfo,
  putOffResearch,
  startResearch,
} from "../../apis/research";
import { toast } from "react-toastify";
import OkIcon from "../ResearchAndDevelopTree/icons/OkIcon";

import rAndDEmpty from "../../assets/r-and-d-empty.svg";

import styles from "./style.module.scss";

import jsonData from "./data.json";
import { formatPrice } from "../../utils/formatters";

const ResearchAndDevelopPanel = ({ refresh }) => {
  const data = useRecoilValue(dataState);
  const [info, setInfo] = useState(null);
  const [refreshSelf, setRefreshSelf] = useState(true);

  useEffect(() => {
    if (data) {
      getSubjectInfo(data.value)
        .then((res) => {
          setInfo({
            price: res.data.result.price,
            balance: res.data.result.balance,
            endTime: res.data.result.endTime,
            beginTime: res.data.result.beginTime,
            done:
              res.data.result?.endTime &&
              new Date() > new Date(res.data.result?.endTime),
            duration: res.data.result.duration / 1000,
          });
        })
        .catch((err) => {
          setInfo({});
          toast.error(
            err?.response?.data?.message || "خطایی در دریافت اطلاعات روی داد!"
          );
        });
      setRefreshSelf(false);
    }
  }, [data?.value, refreshSelf]);

  const [remainingTime, setRemainingTime] = useState(
    (new Date(info?.endTime) - new Date()) / 1000
  );

  useEffect(() => {
    let id;
    if (remainingTime < 0) {
      setRemainingTime(0);
      setRefreshSelf(true);
      refresh();
      return;
    }
    if (info?.endTime && info?.beginTime && info?.done === false) {
      id = setTimeout(() => {
        setRemainingTime(
          Math.floor((new Date(info?.endTime) - new Date()) / 1000)
        );
      }, 1000);
    }

    return () => clearTimeout(id);
  }, [info?.endTime, info?.beginTime, remainingTime, refreshSelf]);

  return (
    <div className={styles["container"]}>
      {data && (
        <>
          <div>
            <img
              className={styles["subject-image"]}
              src="/touch-screen.png"
              alt=""
            />

            <div className={styles["title"]}>{data?.title}</div>
            <div className={styles["desc"]}>{jsonData[data.value]?.desc}</div>
          </div>

          <div>
            <div className={styles["divider"]}></div>
            {info?.endTime && info?.beginTime ? (
              info?.done ? (
                <div className={styles["done"]} dir="rtl">
                  <div className={styles["icon-container"]}>
                    <OkIcon />
                  </div>
                  <div>کارخانه‌ی شما به این فناوری مجهز شده است.</div>
                </div>
              ) : (
                <>
                  <div className={styles["info"]} dir="rtl">
                    <div className={styles["percentage"]}>
                      <div>در حال تحقیق و توسعه</div>
                      <div>
                        {remainingTime ? Math.floor(remainingTime / 60) : "00"}:
                        {remainingTime
                          ? String(remainingTime % 60).padStart(2, "0")
                          : "00"}
                      </div>
                    </div>
                    <div className={styles["bar"]}>
                      <div
                        className={styles["progress"]}
                        style={{
                          width: `${Math.floor(
                            (1 -
                              remainingTime /
                                ((new Date(info?.endTime) -
                                  new Date(info?.beginTime)) /
                                  1000)) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <button
                    className={styles["r-and-d-button"]}
                    disabled={
                      (1 -
                        remainingTime /
                          ((new Date(info?.endTime) -
                            new Date(info?.beginTime)) /
                            1000)) *
                        100 >=
                      50
                    }
                    onClick={() => {
                      putOffResearch(data?.value)
                        .then((res) => {
                          setInfo({
                            price: res.data.result.price,
                            balance: res.data.result.balance,
                            endTime: res.data.result.endTime,
                            beginTime: res.data.result.beginTime,
                            done:
                              res.data.result?.endTime &&
                              new Date() > new Date(res.data.result?.endTime),
                            duration: res.data.result?.duration / 1000,
                          });
                          setRemainingTime(0);
                          refresh();
                        })
                        .catch((err) => {
                          toast.error(
                            err?.response?.data?.message ||
                              "خطایی در درخواست شما روی داد!"
                          );
                        });
                    }}
                  >
                    انصراف
                  </button>
                </>
              )
            ) : (
              <>
                <div className={styles["info"]} dir="rtl">
                  <div className={styles["invest-cost"]}>
                    زمان مورد نیاز:{" "}
                    {info?.duration ? Math.floor(info?.duration / 60) : "00"}:
                    {info?.duration
                      ? String(info?.duration % 60).padStart(2, "0")
                      : "00"}
                  </div>
                  <div className={styles["invest-cost"]}>
                    هزینه سرمایه‌گذاری: {formatPrice(info?.price)}
                  </div>
                  <div>موجودی فعلی: {formatPrice(info?.balance)}</div>
                  <div>
                    موجودی بعد از سرمایه‌گذاری:{" "}
                    {formatPrice(info?.balance - info?.price || 0)}
                  </div>
                </div>
                <button
                  className={styles["r-and-d-button"]}
                  onClick={() => {
                    startResearch(data.value)
                      .then(() => {
                        refresh();
                        setRefreshSelf(true);
                      })
                      .catch((err) => {
                        console.log(err);
                        toast.error(
                          err?.response?.data?.message ||
                            "خطایی در درخواست شما روی داد!"
                        );
                      });
                  }}
                >
                  سرمایه‌گذاری
                </button>
              </>
            )}
          </div>
        </>
      )}
      {!data && (
        <div className={styles["empty"]}>
          <img src={rAndDEmpty} alt="r and d" />
          <p>
            برای مشاهده‌ی توضیحات هر کدام از فناوری‌ها، روی شکل آن کلیک کنید.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResearchAndDevelopPanel;
