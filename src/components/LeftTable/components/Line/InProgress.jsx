import React, { useEffect, useRef, useState } from "react";
import { cancelLine, collectLine } from "../../../../apis/production";
import Button from "../../../Button";
import gameinGearLogo from "../../../../assets/gamein_gear_gray.svg";
import { toast } from "react-toastify";
import { GROUPS } from "../../../../constants/groups";
import MyCountDown from "../../../CountDown/MyCountDown";
import Modal from "../../../Modal";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro"

function InProgress({
  lineTypeString,
  currentTime,
  startTime,
  endTime,
  lineId,
  updateLines,
  count,
  product,
  group,
}) {
  const [currentTimeInMilliSec, setCurrentTimeInMilliSec] = useState(
    new Date(currentTime).getTime()
  );
  const [cancelLineModalOpen, setCancelLineModalOpen] = useState(false);
  const startTimeInMilliSec = new Date(startTime).getTime();
  const endTimeInMilliSec = new Date(endTime).getTime();
  const percent = (
    (currentTimeInMilliSec - startTimeInMilliSec) /
    (endTimeInMilliSec - startTimeInMilliSec)
  ).toFixed(2);
  const remainedTime = (endTimeInMilliSec - currentTimeInMilliSec) / 1000;

  const handleCollect = () => {
    collectLine({ lineId })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(
          plural(count, {
            one: `# عدد ${product?.name} به انبار اضافه شد.`,
            other: `# عدد ${product?.name} به انبار اضافه شد.`
          })
          );
        updateLines();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
        updateLines();
      });
  };

  const handleCountDownTick = () => {
    setCurrentTimeInMilliSec(currentTimeInMilliSec + 1000);
  };

  const handleCountDownComplete = () => {
    setCurrentTimeInMilliSec(endTimeInMilliSec);
  };

  const handleCancelLine = () => {
    cancelLine({ lineId })
      .then((res) => res.data)
      .then((data) => {
        toast.success(t`خط ${lineTypeString} با موفقیت لغو شد.`);
        setCancelLineModalOpen(false);
        updateLines();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  return (
    <>
      <div
        className={
          currentTimeInMilliSec >= endTimeInMilliSec
            ? "line line--DONE"
            : "line line--IN_PROGRESS"
        }
      >
        <div className="line__header">
          <div>
            خط {lineTypeString} {GROUPS[group] || group}
          </div>
          <img src={gameinGearLogo} alt="gamein gear logo" />
        </div>

        <div
          className="line__progress"
          style={{
            width:
              currentTimeInMilliSec < endTimeInMilliSec
                ? `${percent * 100}%`
                : 0,
          }}
        ></div>
        {currentTimeInMilliSec >= endTimeInMilliSec ? (
          <div className="line__body">
            <div>
             <Trans> {lineTypeString} {product?.name} انجام شد!</Trans>
            </div>
            <Button onClick={handleCollect} type="info-reverse">
             <Trans> باشه</Trans>
            </Button>
          </div>
        ) : (
          <div className="line__body">
            <div>
              <Trans>در حال {lineTypeString} {product?.name}</Trans>
            </div>
            <MyCountDown
              timeInSeconds={remainedTime}
              onComplete={handleCountDownComplete}
              onTick={handleCountDownTick}
            />
            <Button
              onClick={() => setCancelLineModalOpen(true)}
              type={"warning"}
            >
             <Trans> لغو {lineTypeString}</Trans>
            </Button>
          </div>
        )}
      </div>
      <Modal
        open={cancelLineModalOpen}
        onClose={() => setCancelLineModalOpen(false)}
      >
        <div><Trans>آیا مطمئن هستید می‌خواهید {lineTypeString} را لغو کنید</Trans></div>
        <div className="extend-ground__btns">
          <Button className="extend-ground__btn-yes" onClick={handleCancelLine}>
           
           <Trans>بله</Trans>
          </Button>
          <Button onClick={() => setCancelLineModalOpen(false)} type="error">
        <Trans>بازگشت</Trans>
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default InProgress;
