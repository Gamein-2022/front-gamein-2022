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

import { formatPrice } from "../../utils/formatters";

import touchScreen from "../../assets/r_and_d_images/touch-screen.png";
import foldableScreen from "../../assets/r_and_d_images/foldable-screen.png";
import advancedDisplay from "../../assets/r_and_d_images/advanced-display.png";
import ThreeG from "../../assets/r_and_d_images/3G.png";
import FourG from "../../assets/r_and_d_images/4G.png";
import FiveG from "../../assets/r_and_d_images/5G.png";
import basicSocMemory from "../../assets/r_and_d_images/basic-soc-memory.png";
import quantumComputation from "../../assets/r_and_d_images/quantum-computation.png";
import camera from "../../assets/r_and_d_images/camera.png";
import multiCamera from "../../assets/r_and_d_images/multi-camera.png";
import assembly1 from "../../assets/r_and_d_images/assembly-1.png";
import assembly2 from "../../assets/r_and_d_images/assembly-2.png";
import assembly3 from "../../assets/r_and_d_images/assembly-3.png";
import assembly4 from "../../assets/r_and_d_images/assembly-4.png";

import touchScreenInfo from "../../assets/r_and_d_images/touch-screen-info.svg";
import foldableScreenInfo from "../../assets/r_and_d_images/foldable-screen-info.svg";
import advancedDisplayInfo from "../../assets/r_and_d_images/advanced-display-info.svg";
import ThreeGInfo from "../../assets/r_and_d_images/3G-info.svg";
import FourGInfo from "../../assets/r_and_d_images/4G-info.svg";
import FiveGInfo from "../../assets/r_and_d_images/5G-info.svg";
import basicSocMemoryInfo from "../../assets/r_and_d_images/basic-soc-memory-info.svg";
import quantumComputationInfo from "../../assets/r_and_d_images/quantum-computation-info.svg";
import cameraInfo from "../../assets/r_and_d_images/camera-info.svg";
import multiCameraInfo from "../../assets/r_and_d_images/multi-camera-info.svg";
import assembly1Info from "../../assets/r_and_d_images/assembly-1-info.svg";
import assembly2Info from "../../assets/r_and_d_images/assembly-2-info.svg";
import assembly3Info from "../../assets/r_and_d_images/assembly-3-info.svg";
import assembly4Info from "../../assets/r_and_d_images/assembly-4-info.svg";

const mainImages = {
  "touch-screen": touchScreen,
  "foldable-screen": foldableScreen,
  "advanced-display": advancedDisplay,
  "3G": ThreeG,
  "4G": FourG,
  "5G": FiveG,
  "basic-soc-memory": basicSocMemory,
  "quantum-computation": quantumComputation,
  camera: camera,
  "multi-camera": multiCamera,
  "assembly-1": assembly1,
  "assembly-2": assembly2,
  "assembly-3": assembly3,
  "assembly-4": assembly4,
};

const infoImages = {
  "touch-screen": touchScreenInfo,
  "foldable-screen": foldableScreenInfo,
  "advanced-display": advancedDisplayInfo,
  "3G": ThreeGInfo,
  "4G": FourGInfo,
  "5G": FiveGInfo,
  "basic-soc-memory": basicSocMemoryInfo,
  "quantum-computation": quantumComputationInfo,
  camera: cameraInfo,
  "multi-camera": multiCameraInfo,
  "assembly-1": assembly1Info,
  "assembly-2": assembly2Info,
  "assembly-3": assembly3Info,
  "assembly-4": assembly4Info,
};

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
            timeDiff:
              new Date(res.data.result.currentTime).getTime() - Date.now(),
            done:
              res.data.result?.endTime &&
              new Date(res.data.result.currentTime).getTime() >
                new Date(res.data.result?.endTime).getTime(),
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
    (new Date(info?.endTime).getTime() - Date.now()) / 1000
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
          Math.floor(
            (new Date(info?.endTime).getTime() -
              Date.now() -
              (info?.timeDiff || 0)) /
              1000
          )
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
              src={mainImages[data.value]}
              alt=""
            />

            <div className={styles["title"]}>{data?.title}</div>
            <div className={styles["desc"]}>
              با سرمایه‌گذاری بر روی این فناوری، امکان تولید محصولات زیر را
              خواهید داشت:
            </div>

            <img
              className={styles["subject-image"]}
              src={infoImages[data.value]}
              alt=""
            />
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
                          ? String(Math.floor(remainingTime % 60)).padStart(
                              2,
                              "0"
                            )
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
                                ((new Date(info?.endTime).getTime() -
                                  new Date(info?.beginTime).getTime()) /
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
                          ((new Date(info?.endTime).getTime() -
                            new Date(info?.beginTime).getTime()) /
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
                              Date.now() >
                                new Date(res.data.result?.endTime).getTime(),
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
            ) : info?.price !== -1 ? (
              <>
                <div className={styles["info"]} dir="rtl">
                  <div className={styles["invest-cost"]}>
                    زمان مورد نیاز:{" "}
                    {info?.duration ? Math.floor(info?.duration / 60) : "00"}:
                    {info?.duration
                      ? String(Math.floor(info?.duration % 60)).padStart(2, "0")
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
            ) : (
              <div>شما امکان این تحقیق و توسعه را ندارید!</div>
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
