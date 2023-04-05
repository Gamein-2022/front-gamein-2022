import React, { useEffect, useState } from "react";
import { getLines } from "../../../../apis/production";
import Line from "../Line";
import "./style.scss";

function ProductionAndAssembly() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    getLines()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setLines(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateLines = () => {
    getLines()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setLines(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="production-and-assembly">
      {lines.map((line) => (
        <Line {...line} updateLines={updateLines} />
      ))}
      {lines?.length <= 0 && (
        <div className="production-and-assembly__empty">
          شما هیچ خط تولید یا مونتاژی ندارید.
        </div>
      )}
    </div>
  );
}

export default ProductionAndAssembly;
