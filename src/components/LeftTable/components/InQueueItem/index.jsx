import React, { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Button from "../../../Button";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro"
import sampleImg from "../../../../assets/icons/copper.png";

import { collectShipping, removeInQueueItem } from "../../../../apis/storage";
import { toast } from "react-toastify";

import "./style.scss";
import {
  INTERMEDIATE_MATERIALS_LEVEL_ONE,
  INTERMEDIATE_MATERIALS_LEVEL_TWO,
  RAW_MATERIALS,
} from "../../../../constants/materials";
import MyCountDown from "../../../CountDown/MyCountDown";

function InQueueItem({ item, updateInQueueProducts }) {
  const [remainedTime, setRemainedTime] = useState(0);

  useEffect(() => {
    const ariveTime = new Date(item.arrivalTime).getTime();
    const currentTime = new Date(item.currentTime).getTime();
    const newTime = 60 - Math.round((currentTime - ariveTime) / 1000);
    setRemainedTime(newTime > 0 ? newTime : 0);
  }, []);

  const handleCollect = (item) => {
    collectShipping({ id: item.id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        const amount=item?.amount;
        toast.success(
plural(amount, {
  one: `# عدد ${item?.product?.name} به انبار اضافه شد.`,
  other: `# عدد ${item?.product?.name} به انبار اضافه شد.`
})

        );
        updateInQueueProducts();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleDelete = () => {
    removeInQueueItem({ id: item.id })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(
          plural(item?.amount, {
            one: `# عدد ${item?.product?.name} از صف انبار حذف شد.`,
            other: `# عدد ${item?.product?.name} از صف انبار حذف شد.`
          })
        );
        updateInQueueProducts();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const handleCountDownCompleted = () => {
    setRemainedTime(0)
  }

  return (
    <div className="in-queue-item">
      <div className="in-queue-item__header">
        <img
          className="in-queue-item__img"
          src={
            RAW_MATERIALS[item?.product?.name]?.icon ||
            INTERMEDIATE_MATERIALS_LEVEL_ONE[item?.product?.name]?.icon ||
            INTERMEDIATE_MATERIALS_LEVEL_TWO[item?.product?.name]?.icon ||
            sampleImg
          }
          alt="product"
        />
        <div className="in-queue-item__header-left">
          <div>{item?.product?.name}</div>
          <div><Trans>تعداد:</Trans> {item?.amount}</div>
        </div>
      </div>
      {true ? (
        <div className="in-queue-item__status in-queue-item__status-success">
          <CheckCircleRoundedIcon />
         <Trans> ظرفیت انبار برای این محموله کافی است.</Trans>
        </div>
      ) : (
        <div className="in-queue-item__status in-queue-item__status-error">
          <CancelRoundedIcon />
<Trans>ظرفیت انبار برای این محموله کافی نیست!
</Trans>        </div>
      )}
      <div className="in-queue-item__footer">
        <div className="in-queue-item__time">
        <Trans>زمان باقیمانده:</Trans> <MyCountDown timeInSeconds={remainedTime} onComplete={handleCountDownCompleted}/>
        </div>
        <div className="in-queue-item__actions">
          <Button
            onClick={() => handleCollect(item)}
            className="in-queue-item__enter-storage"
            disabled={remainedTime <= 0}
          >
<Trans>ورود به انبار
</Trans>          </Button>
          <Button className="in-queue-item__delete" onClick={handleDelete}>
            <DeleteForeverOutlinedIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InQueueItem;
