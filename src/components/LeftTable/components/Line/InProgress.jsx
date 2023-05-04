import React, { useEffect, useRef, useState } from "react";
import { collectLine } from "../../../../apis/production";
import Button from "../../../Button";
import gameinGearLogo from "../../../../assets/gamein_gear_gray.svg";
import { toast } from "react-toastify";
import { GROUPS } from "../../../../constants/groups";
import MyCountDown from "../../../CountDown/MyCountDown";

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
  const [currentTimeInMilliSec, setCurrentTimeInSec] = useState(
    new Date(currentTime).getTime()
  );
  const startTimeInMilliSec = new Date(startTime).getTime();
  const endTimeInMilliSec = new Date(endTime).getTime();
  const percent = (
    (currentTimeInMilliSec - startTimeInMilliSec) /
    (endTimeInMilliSec - startTimeInMilliSec)
  ).toFixed(2);
  const remainedTime = ((endTimeInMilliSec - currentTimeInMilliSec) / 1000);

  const handleCollect = () => {
    collectLine({ lineId })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success(`${count} عدد ${product?.name} به انبار اضافه شد.`);
        updateLines();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
        updateLines();
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
            width: currentTimeInMilliSec < endTimeInMilliSec ? `${percent * 100}%` : 0,
          }}
        ></div>
        {currentTimeInMilliSec >= endTimeInMilliSec ? (
          <div className="line__body">
            <div>
              {lineTypeString} {product?.name} انجام شد!
            </div>
            <Button onClick={handleCollect} type="info-reverse">
              باشه
            </Button>
          </div>
        ) : (
          <div className="line__body">
            <div>
              در حال {lineTypeString} {product?.name}
            </div>
            <MyCountDown timeInSeconds={remainedTime}/>
          </div>
        )}
      </div>
    </>
  );
}

export default InProgress;
