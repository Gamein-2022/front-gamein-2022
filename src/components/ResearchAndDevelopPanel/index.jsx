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
          });
        })
        .catch((err) => {
          setInfo(null);
          toast.error(
            err?.response?.data?.message || "خطایی در دریافت اطلاعات روی داد!"
          );
        });
      setRefreshSelf(false);
    }
  }, [data?.value, refreshSelf]);

  const [currentPercentage, setCurrentPercentage] = useState(
    info?.endTime && info?.beginTime
      ? Math.floor(
          (100 * (new Date().getTime() - new Date(info.beginTime).getTime())) /
            (new Date(info.endTime).getTime() -
              new Date(info.beginTime).getTime())
        )
      : 0
  );

  useEffect(() => {
    let id;
    if (currentPercentage >= 100) {
      setCurrentPercentage(0);
      setRefreshSelf(true);
      refresh();
      return;
    }
    if (info?.endTime && info?.beginTime && info?.done === false) {
      id = setTimeout(() => {
        setCurrentPercentage(
          Math.floor(
            (100 *
              (new Date().getTime() - new Date(info.beginTime).getTime())) /
              (new Date(info.endTime).getTime() -
                new Date(info.beginTime).getTime())
          )
        );
      }, (new Date(info.endTime).getTime() - new Date(info.beginTime).getTime()) / 100);
    }

    return () => clearTimeout(id);
  }, [info?.endTime, info?.beginTime, currentPercentage]);

  return (
    <div className={styles["container"]}>
      {data && (
        <>
          <img
            className={styles["subject-image"]}
            src="/touch-screen.png"
            alt=""
          />

          <div className={styles["title"]}>{data?.title}</div>
          <div className={styles["desc"]}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
          </div>

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
                    <div>{currentPercentage}٪</div>
                  </div>
                  <div className={styles["bar"]}>
                    <div
                      className={styles["progress"]}
                      style={{ width: `${currentPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  className={styles["r-and-d-button"]}
                  disabled={currentPercentage >= 50}
                  onClick={() => {
                    putOffResearch(data?.value)
                      .then((res) => {
                        setInfo({
                          price: res.data.result.subject.price,
                          balance: res.data.result.balance,
                          endTime: res.data.result.endTime,
                          beginTime: res.data.result.beginTime,
                          done:
                            res.data.result?.endTime &&
                            new Date() > new Date(res.data.result?.endTime),
                        });
                        setCurrentPercentage(0);
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
                  هزینه سرمایه‌گذاری: {info?.price}
                </div>
                <div>موجودی فعلی: {info?.balance}</div>
                <div>
                  موجودی بعد از سرمایه‌گذاری:{" "}
                  {info?.balance - info?.price || undefined}
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
