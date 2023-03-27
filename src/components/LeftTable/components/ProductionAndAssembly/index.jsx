import React from "react";
import Line from "../Line";
import "./style.scss";

function ProductionAndAssembly() {
  return (
    <div className="production-and-assembly">
      {/* <Line status={"NOT_INITIAL"} /> */}
      <Line status={"OFF"} />
      <Line status={"IN_PROGRESS"} />
      <Line status={"DONE"} />
    </div>
  );
}

export default ProductionAndAssembly;
