import React, { useEffect } from "react";
import { yearState, monthState, dayState } from "../../store/time";
import { getTime } from "../../apis/time";
import { useRecoilState } from "recoil";

const Time = () => {
  const [year, setYear] = useRecoilState(yearState);
  const [month, setMonth] = useRecoilState(monthState);
  const [day, setDay] = useRecoilState(dayState);

  useEffect(() => {
    getTime()
      .then((res) => res.data)
      .then((data) => {
        console.log("************************");
        console.log(data);
        setYear(data.year);
        setMonth(data.month);
        setDay(data.day);
      });
  }, []);

  useEffect(() => {
    if (year && month && day) {
      const id = setInterval(() => {
        let newDay = day;
        let newMonth = month;
        let newYear = year;
        newDay += 1;
        if (newDay > 30) {
          newDay = 1;
          newMonth += 1;
          if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
          }
        }
        // setTime((old) => ({ ...old, day, month, year }));
        setYear(newYear);
        setMonth(newMonth);
        setDay(newDay);
      }, 6000);

      return () => {
        clearInterval(id);
      };
    }
  }, [year, month, day]);

  return (
    <div className="layout__time">{`${year || 0}/${month || 0}/${
      day || 0
    }`}</div>
  );
};

export default Time;
