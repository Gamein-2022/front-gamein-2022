import React, { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Button from "../../../Button";

import sampleImg from "../../../../assets/icons/copper.png";

import { collectShipping } from "../../../../apis/storage";
import { toast } from "react-toastify";

import "./style.scss";

function InQueueItem({ item, updateInQueueProducts }) {
  const [remainedTime, setRemainedTime] = useState(0);

  const handleCollect = (item) => {
    collectShipping({ id: item.id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(
          `${item?.amount} عدد ${item?.product?.name} به انبار اضافه شد.`
        );
        updateInQueueProducts();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  useEffect(() => {
    const ariveTime = new Date(item.arrivalTime).getTime();
    const currentTime = new Date(item.currentTime).getTime();
    const newTime = 60000 - (currentTime - ariveTime);
    setRemainedTime(newTime > 0 ? newTime : 0);
  }, []);

  return (
    <div className="in-queue-item">
      <div className="in-queue-item__header">
        <img className="in-queue-item__img" src={sampleImg} alt="product" />
        <div className="in-queue-item__header-left">
          <div>{item?.product?.name}</div>
          <div>تعداد: {item?.amount}</div>
        </div>
      </div>
      {true ? (
        <div className="in-queue-item__status in-queue-item__status-success">
          <CheckCircleRoundedIcon />
          ظرفیت انبار برای این محموله کافی است.
        </div>
      ) : (
        <div className="in-queue-item__status in-queue-item__status-error">
          <CancelRoundedIcon />
          ظرفیت انبار برای این محموله کافی نیست!
        </div>
      )}
      <div className="in-queue-item__footer">
        <div className="in-queue-item__time">زمان باقیمانده: {remainedTime} ثانیه</div>
        <div className="in-queue-item__actions">
          <Button
            onClick={() => handleCollect(item)}
            className="in-queue-item__enter-storage"
            disabled={remainedTime <= 0}
          >
            ورود به انبار
          </Button>
          <Button className="in-queue-item__delete">
            <DeleteForeverOutlinedIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InQueueItem;
