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
              {performanceInfo?.rank + 1}
            </div>
          </div>
        )}
        {performanceInfo?.rank < 0 && (
          <div className="my-performance__item">
            <div className="my-performance__item-title">
              فاصله دارایی با تیم صدم
            </div>
            <div className="my-performance__item-value">
              {formatPrice(performanceInfo?.lastTopWealth - performanceInfo?.teamWealth)}
            </div>
          </div>
        )}
      </div>
      <div className="my-performance__tables">
        <div className="my-performance__table">
          <div className="my-performance__table-title">
            تیم‌های بالاتر از شما
          </div>
          {performanceInfo?.upper?.length > 0 && (
            <>
              <div className="my-performance__table-row">
                <div className="my-performance__table-right">اسم تیم</div>
                <div className="my-performance__table-left">دارایی</div>
              </div>
              {performanceInfo?.upper?.map((item) => (
                <div className="my-performance__table-row">
                  <div className="my-performance__table-right">
                    {item?.teamName}
                  </div>
                  <div className="my-performance__table-left">
                    {formatPrice(item?.wealth)}
                  </div>
                </div>
              ))}
            </>
          )}
          {performanceInfo?.upper?.length <= 0 && (
            <div style={{ marginTop: 32 }}>شما تیم اول هستید.</div>
          )}
        </div>
        <div className="my-performance__table">
          <div className="my-performance__table-title">
            تیم‌های پایین‌تر از شما
          </div>
          {performanceInfo?.lower?.length > 0 && (
            <>
              <div className="my-performance__table-row">
                <div className="my-performance__table-right">اسم تیم</div>
                <div className="my-performance__table-left">دارایی</div>
              </div>
              {performanceInfo?.lower?.map((item) => (
                <div className="my-performance__table-row">
                  <div className="my-performance__table-right">
                    {item?.teamName}
                  </div>
                  <div className="my-performance__table-left">
                    {formatPrice(item?.wealth)}
                  </div>
                </div>
              ))}
            </>
          )}
          {performanceInfo?.lower?.length <= 0 && (
            <div style={{ marginTop: 32 }}>شما تیم اول هستید.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPerformance;
