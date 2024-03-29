import { useEffect, useState } from "react";
import calendarLogo from "../../assets/calendar.svg";
import { getTime } from "../../apis/time";
import { useSetRecoilState } from "recoil";
import { dayState, monthState, yearState } from "../../store/time";

function SyncedClock() {
  const dayDurationInMiliSeconds = 8000;
  const [virtualDate, setVirtualDate] = useState<number>(0);
  const setStoreDay = useSetRecoilState(dayState);
  const setStoreMonth = useSetRecoilState(monthState);
  const setStoreYear = useSetRecoilState(yearState);

  const updateTime = (
    delay: number,
    baseDate: number,
    baseVirtualDate: number
  ) => {
    setTimeout(() => {
      const diff = Date.now() - baseDate;
      setVirtualDate(baseVirtualDate + diff);

      if (diff > 30 * dayDurationInMiliSeconds) {
        readFromServer();
      } else {
        updateTime(
          dayDurationInMiliSeconds - (diff % 8000),
          baseDate,
          baseVirtualDate
        );
      }
    }, delay);
  };

  const readFromServer = () => {
    const before = Date.now();

    getTime()
      .then((res) => res.data)
      .then((data) => {
        const after = Date.now();
        const virtualDate =
          ((data.year * 12 + data.month - 1) * 30 + data.day - 1) *
          dayDurationInMiliSeconds;
        const passedMiliSeconds = data.durationMillis % 8000;
        const baseDate = before - passedMiliSeconds + (after - before) / 2;
        const delay =
          dayDurationInMiliSeconds - passedMiliSeconds - (after - before) / 2;
        setVirtualDate(virtualDate);
        updateTime(delay, baseDate, virtualDate);
      });
  };

  useEffect(() => {
    readFromServer();
  }, []);

  const day = (Math.floor(virtualDate / dayDurationInMiliSeconds) % 30) + 1;
  const month =
    (Math.floor(virtualDate / dayDurationInMiliSeconds / 30) % 12) + 1;
  const year = Math.floor(virtualDate / dayDurationInMiliSeconds / 30 / 12);

  setStoreDay(day);
  setStoreMonth(month);
  setStoreYear(year);

  return (
    <>
      <img src={calendarLogo} alt="calendar" />
      {String(year).padStart(4, "0")}/{String(month).padStart(2, "0")}/
      {String(day).padStart(2, "0")}
    </>
  );
}

export default SyncedClock;
