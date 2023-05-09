import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getLogs } from "../../../../apis/dashboard";
import GameinLoading from "../../../../components/GameinLoading";
import { formatPrice } from "../../../../utils/formatters";
import "./style.scss";

// default: "DEFAULT",
const LOG_TYPES = [
  { type: "SELL", name: "فروش محصول میانی", isGreen: true },
  { type: "BUY", name: "خرید", isGreen: false },
  { type: "PRODUCTION", name: "تولید", isGreen: false },
  { type: "ASSEMBLY", name: "مونتاژ", isGreen: false },
  { type: "FINAL_SELL", name: "فروش محصول نهایی", isGreen: true },
  { type: "STORAGE_COST", name: "هزینه انبارداری", isGreen: false },
];

function Transactions() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [activeType, setActiveType] = useState(LOG_TYPES[0]);

  useEffect(() => {
    setLoading(true);
    getLogs(activeType.type)
      .then((res) => res.data)
      .then((data) => {
        setRows(data?.logs);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [activeType]);

  return (
    <div className="logs">
      <div className="logs__chips">
        {LOG_TYPES.map((type) => (
          <div
            key={type.type}
            onClick={() => setActiveType(type)}
            className={classNames("logs__chip", {
              "logs__chip--active": activeType.type === type.type,
            })}
          >
            {type.name}
          </div>
        ))}
      </div>
      {loading && <GameinLoading size={48} />}
      {!loading && (
        <>
          {rows?.length > 0 && (
            <table className="logs__table">
              <thead>
                <tr>
                  {activeType.name !== "هزینه انبارداری" && <th>نام کالا</th>}
                  {activeType.name !== "هزینه انبارداری" && <th>تعداد</th>}
                  <th>{activeType?.isGreen ? "درآمد" : "هزینه"}</th>
                  <th>تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr>
                    {activeType.name !== "هزینه انبارداری" && (
                      <td>{row?.productName}</td>
                    )}
                    {activeType.name !== "هزینه انبارداری" && (
                      <td>{formatPrice(row?.count)}</td>
                    )}
                    <td
                      className={
                        activeType?.isGreen ? "logs__green" : "logs__red"
                      }
                    >
                      {formatPrice(row?.totalCost)}
                      {activeType?.isGreen ? "+" : "-"}
                    </td>
                    <td>{`${row?.date[0]}/${String(row?.date[1]).padStart(
                      2,
                      "0"
                    )}/${String(row?.date[2]).padStart(2, "0")}`}</td>
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

export default Transactions;
