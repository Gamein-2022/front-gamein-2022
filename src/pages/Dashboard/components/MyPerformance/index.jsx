import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../../../apis/dashboard";
import { formatPrice } from "../../../../utils/formatters";
import "./style.scss";

function MyPerformance() {
  const [performanceInfo, setPerformanceInfo] = useState({});
  useEffect(() => {
    getLeaderboard()
      .then((res) => res.data)
      .then((data) => {
        setPerformanceInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="my-performance">
      <div className="my-performance__top">
        <div className="my-performance__item">
          <div className="my-performance__item-title">مجموعه دارایی شما</div>
          <div className="my-performance__item-value">
            {formatPrice(performanceInfo?.teamWealth)}
          </div>
        </div>
        <div className="my-performance__item">
          <div className="my-performance__item-title">امتیاز برند شما</div>
          <div className="my-performance__item-value">
            {performanceInfo?.brand}
          </div>
        </div>
        {performanceInfo?.rank >= 0 && (
          <div className="my-performance__item">
            <div className="my-performance__item-title">
              رتبه شما در بین صد تیم برتر
            </div>
            <div className="my-performance__item-value">
              {performanceInfo?.rank}
            </div>
          </div>
        )}
        {performanceInfo?.rank < 0 && (
          <div className="my-performance__item">
            <div className="my-performance__item-title">
              فاصله دارایی با تیم صدم
            </div>
            <div className="my-performance__item-value">
              {formatPrice(870000)}
            </div>
          </div>
        )}
      </div>
      <div className="my-performance__tables">
        <div className="my-performance__table">
          <div className="my-performance__table-title">
            سه تیم بالاتر از شما
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">اسم تیم</div>
            <div className="my-performance__table-left">دارایی</div>
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">تیم فلانی</div>
            <div className="my-performance__table-left">
              {formatPrice(12345678)}
            </div>
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">تیم فلانی</div>
            <div className="my-performance__table-left">
              {formatPrice(12345678)}
            </div>
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">تیم فلانی</div>
            <div className="my-performance__table-left">
              {formatPrice(12345678)}
            </div>
          </div>
        </div>
        <div className="my-performance__table">
          <div className="my-performance__table-title">
            سه تیم پایین‌تر از شما
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">اسم تیم</div>
            <div className="my-performance__table-left">دارایی</div>
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">تیم فلانی</div>
            <div className="my-performance__table-left">
              {formatPrice(12345678)}
            </div>
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">تیم فلانی</div>
            <div className="my-performance__table-left">
              {formatPrice(12345678)}
            </div>
          </div>
          <div className="my-performance__table-row">
            <div className="my-performance__table-right">تیم فلانی</div>
            <div className="my-performance__table-left">
              {formatPrice(12345678)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPerformance;
