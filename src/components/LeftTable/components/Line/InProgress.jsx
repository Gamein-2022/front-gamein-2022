import React, { useEffect, useRef, useState } from "react";
import { collectLine } from "../../../../apis/production";
import Button from "../../../Button";
import gameinGearLogo from "../../../../assets/gamein_gear_gray.svg";
import { toast } from "react-toastify";
import { GROUPS } from "../../../../constants/groups";

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
  const [currentTimeInSec, setCurrentTimeInSec] = useState(
    new Date(currentTime).getTime()
  );
  const intervalId = useRef();
  const startTimeInSec = new Date(startTime).getTime();
  const endTimeInSec = new Date(endTime).getTime();
  const percent = (
    (currentTimeInSec - startTimeInSec) /
    (endTimeInSec - startTimeInSec)
  ).toFixed(2);
  const remainedTime = ((endTimeInSec - currentTimeInSec) / 1000).toFixed(2);

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

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrentTimeInSec((old) => old + 1000);
    }, 1000);
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      clearInterval(intervalId.current);
    }
  }, [percent]);

  return (
    <>
      <div
        className={
          currentTimeInSec >= endTimeInSec
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
            width: currentTimeInSec < endTimeInSec ? `${percent * 100}%` : 0,
          }}
        ></div>
        {currentTimeInSec >= endTimeInSec ? (
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
            <div>{Math.floor(remainedTime)}ثانیه</div>
          </div>
        )}
      </div>
    </>
  );
}

export default InProgress;
