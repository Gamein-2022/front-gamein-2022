import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import { getLogs } from "../../../../apis/dashboard";
import Button from "../../../../components/Button";
import GameinLoading from "../../../../components/GameinLoading";
import { formatPrice } from "../../../../utils/formatters";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import "./style.scss";

// default: "DEFAULT",
const LOG_TYPES = [
  { type: "SELL", name: "فروش محصول میانی", isGreen: true },
  { type: "BUY", name: "خرید", isGreen: false },
  { type: "PRODUCTION", name: "تولید", isGreen: false },
  { type: "RECYCLE", name: "بازیافت", isGreen: false },
  { type: "ASSEMBLY", name: "مونتاژ", isGreen: false },
  { type: "FINAL_SELL", name: "فروش محصول نهایی", isGreen: true },
  { type: "STORAGE_COST", name: "هزینه انبارداری", isGreen: false },
];

function Transactions() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [activeType, setActiveType] = useState(LOG_TYPES[0]);
  const [excelLoading, setExcelLoading] = useState(false);

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

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    try {
      setExcelLoading(true);
      getLogs("DEFAULT")
        .then((res) => res.data.logs)
        .then((apiData) => {
          const formattedData = apiData.map((item) => ({
            ...item,
            date: `${item?.date[0]}/${String(item?.date[1]).padStart(
              2,
              "0"
            )}/${String(item?.date[2]).padStart(2, "0")}`,
          }));
          const ws = XLSX.utils.json_to_sheet(formattedData);
          const wb = { Sheets: { logs: ws }, SheetNames: ["logs"] };
          const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
          });
          const data = new Blob([excelBuffer], { type: fileType });
          FileSaver.saveAs(data, "gamein_logs" + fileExtension);
        })
        .finally(() => {
          setExcelLoading(false);
        });
    } catch (err) {
      toast.error("مشکلی در سامانه رخ داده‌است.");
    }
  };

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
      <Button
        className="logs__excel-btn"
        disabled={excelLoading}
        onClick={exportToCSV}
      >
        دانلود اکسل لاگ‌ها
      </Button>
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
