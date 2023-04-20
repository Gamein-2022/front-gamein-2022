import React, { useEffect, useState } from "react";
import { getBuySellLogs } from "../../../../apis/dashboard";
import "./style.scss";

function TradeHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getBuySellLogs()
      .then((res) => res.data)
      .then((data) => {
        setRows(data?.result?.logs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="trade-logs">
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
                  row?.type === "BUY" ? "trade-logs__red" : "trade-logs__green"
                }
              >
                {row?.totalCost}
                {row?.type === "BUY" ? "-" : "+"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeHistory;
