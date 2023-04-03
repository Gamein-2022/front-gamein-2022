import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { dataState } from "../../store/research-and-develop";
import { getSubjectInfo, startResearch } from "../../apis/research";
import { toast } from "react-toastify";

import styles from "./style.module.scss";

const ResearchAndDevelopPanel = ({ refresh }) => {
  const data = useRecoilValue(dataState);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (data) {
      getSubjectInfo(data.value)
        .then((res) => {
          setInfo({
            price: res.data.result.subject.price,
            balance: res.data.result.balance,
          });
        })
        .catch((err) => {
          setInfo(null);
          toast.error(
            err?.response?.data?.message || "خطایی در دریافت اطلاعات روی داد!"
          );
        });
    }
  }, [data]);

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
            className={styles["invest-button"]}
            onClick={() => {
              startResearch(data.value)
                .then(() => {
                  refresh();
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
  );
};

export default ResearchAndDevelopPanel;
