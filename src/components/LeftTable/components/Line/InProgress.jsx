import React, { useEffect, useRef, useState } from "react";
import { cancelLine, collectLine } from "../../../../apis/production";
import Button from "../../../Button";
import gameinGearLogo from "../../../../assets/gamein_gear_gray.svg";
import { toast } from "react-toastify";
import { GROUPS } from "../../../../constants/groups";
import MyCountDown from "../../../CountDown/MyCountDown";
import Modal from "../../../Modal";
import useUpdateBalance from "../../../../hooks/useUpdateBalance";

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
  const [actionLoading, setActionLoading] = useState(false);
  const updateBalance = useUpdateBalance();
  const [cancelLineModalOpen, setCancelLineModalOpen] = useState(false);
  const startTimeInMilliSec = new Date(startTime).getTime();
  const endTimeInMilliSec = new Date(endTime).getTime();
  const percent = (
    (currentTimeInMilliSec - startTimeInMilliSec) /
    (endTimeInMilliSec - startTimeInMilliSec)
  ).toFixed(2);
  const remainedTime = (endTimeInMilliSec - currentTimeInMilliSec) / 1000;

  const handleCollect = () => {
    setActionLoading(true);
    collectLine({ lineId })
      .then((res) => res.data)
      .then((data) => {
        toast.success(`${count} عدد ${product?.name} به انبار اضافه شد.`);
        updateLines();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است.");
        updateLines();
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  const handleCountDownTick = () => {
    setCurrentTimeInMilliSec(currentTimeInMilliSec + 1000);
  };

  const handleCountDownComplete = () => {
    setCurrentTimeInMilliSec(endTimeInMilliSec);
  };

  const handleCancelLine = () => {
    setActionLoading(true);
    cancelLine({ lineId })
      .then((res) => res.data)
      .then((data) => {
        toast.success(`${lineTypeString} با موفقیت لغو شد.`);
        setCancelLineModalOpen(false);
        updateLines();
        updateBalance();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      })
      .finally(() => {
        setActionLoading(false);
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
              {lineTypeString} {product?.name} انجام شد!
            </div>
            <Button
              onClick={handleCollect}
              disabled={actionLoading}
              type="info-reverse"
            >
              باشه
            </Button>
          </div>
        ) : (
          <div className="line__body">
            <div>
              در حال {lineTypeString} {product?.prettyName || product?.name}
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
              لغو {lineTypeString}
            </Button>
          </div>
        )}
      </div>
      <Modal
        open={cancelLineModalOpen}
        onClose={() => setCancelLineModalOpen(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید {lineTypeString} را لغو کنید</div>
        <div className="extend-ground__btns">
          <Button
            disabled={actionLoading}
            className="extend-ground__btn-yes"
            onClick={handleCancelLine}
          >
            بله
          </Button>
          <Button
            disabled={actionLoading}
            onClick={() => setCancelLineModalOpen(false)}
            type="error"
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default InProgress;
