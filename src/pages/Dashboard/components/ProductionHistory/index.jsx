import React, { useEffect, useState } from "react";
import { getProductionAssemblyLogs } from "../../../../apis/dashboard";
import GameinLoading from "../../../../components/GameinLoading";
import "./style.scss";

function ProductionHistory() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getProductionAssemblyLogs()
      .then((res) => res.data)
      .then((data) => {
        setRows(data?.logs);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="production-assembly-logs">
      {loading && <GameinLoading size={48} />}
      {!loading && (
        <>
          {rows?.length > 0 && (
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
          )}
          {rows?.length <= 0 && <div>تاریخچه تولید و مونتاژت خالیه!</div>}
        </>
      )}
    </div>
  );
}

export default ProductionHistory;
