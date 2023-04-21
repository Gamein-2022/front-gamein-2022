import React, { useEffect, useState } from "react";
import { getBuySellLogs } from "../../../../apis/dashboard";
import GameinLoading from "../../../../components/GameinLoading";
import { formatPrice } from "../../../../utils/formatters";
import "./style.scss";

function TradeHistory() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getBuySellLogs()
      .then((res) => res.data)
      .then((data) => {
        setRows(data?.result?.logs);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="trade-logs">
      {loading && <GameinLoading size={48} />}
      {!loading && (
        <>
          {rows?.length > 0 && (
            <table className="trade-logs__table">
              <thead>
                <tr>
                  <th>فرآیند</th>
                  <th>نام کالا</th>
                  <th>تعداد</th>
                  <th>هزینه</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr>
                    <td>{row?.type === "BUY" ? "خرید" : "فروش"}</td>
                    <td>{row?.productName}</td>
                    <td>{row?.count}</td>
                    <td
                      className={
                        row?.type === "BUY"
                          ? "trade-logs__red"
                          : "trade-logs__green"
                      }
                    >
                      {formatPrice(row?.totalCost)}
                      {row?.type === "BUY" ? "-" : "+"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {rows?.length <= 0 && <div>تاریخچه خرید و فروش‌هات خالیه!</div>}
        </>
      )}
    </div>
  );
}

export default TradeHistory;
