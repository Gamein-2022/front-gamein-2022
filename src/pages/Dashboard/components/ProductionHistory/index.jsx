import React, { useEffect, useState } from "react";
import { getProductionAssemblyLogs } from "../../../../apis/dashboard";
import "./style.scss";

function ProductionHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getProductionAssemblyLogs()
      .then((res) => res.data)
      .then((data) => {
        setRows(data?.logs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="production-assembly-logs">
      <table className="production-assembly-logs__table">
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
              <td>{row?.type === "PRODUCTION" ? "تولید" : "مونتاژ"}</td>
              <td>{row?.productName}</td>
              <td>{row?.count}</td>
              <td className="production-assembly-logs__red">
                {row?.totalCost}-
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductionHistory;
