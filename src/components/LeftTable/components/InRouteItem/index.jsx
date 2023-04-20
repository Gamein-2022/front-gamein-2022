import React, { useEffect, useState } from "react";
import sampleImg from "../../../../assets/icons/copper.png";
import {
  INTERMEDIATE_MATERIALS_LEVEL_ONE,
  INTERMEDIATE_MATERIALS_LEVEL_TWO,
  RAW_MATERIALS,
} from "../../../../constants/materials";
import "./style.scss";

function InRouteItem({ item }) {
  const [remainedTime, setRemainedTime] = useState();

  useEffect(() => {
    const ariveTime = new Date(item.arrivalTime).getTime();
    const currentTime = new Date(item.currentTime).getTime();
    const newTime = ariveTime - currentTime;
    setRemainedTime(newTime);
    setInterval(() => {
      setRemainedTime((old) => (old - 1000 > 0 ? old - 1000 : 0));
    }, 1000);
  }, []);

  if (remainedTime <= 0) {
    return null;
  }

  return (
    <div className="in-route-item">
      <div className="in-route-item__header">
        <img
          className="in-route-item__img"
          src={
            RAW_MATERIALS[item?.product?.name]?.icon ||
            INTERMEDIATE_MATERIALS_LEVEL_ONE[item?.product?.name]?.icon ||
            INTERMEDIATE_MATERIALS_LEVEL_TWO[item?.product?.name]?.icon ||
            sampleImg
          }
          alt="product"
        />
        <div className="in-route-item__header-left">
          <div>{item?.product?.name}</div>
          <div>تعداد: {item?.amount}</div>
        </div>
      </div>
      <div className="in-route-item__footer">
        <div className="in-route-item__time">
          زمان باقیمانده: {Math.round(remainedTime / 1000)} ثانیه
        </div>
      </div>
    </div>
  );
}

export default InRouteItem;
