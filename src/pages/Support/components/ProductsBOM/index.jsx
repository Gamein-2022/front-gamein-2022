import React from "react";
import Gphone1BOM from "../../../../assets/guide/Gphone1BOM.svg";
import Gphone2BOM from "../../../../assets/guide/Gphone2BOM.svg";
import Gphone3BOM from "../../../../assets/guide/Gphone3BOM.svg";
import "./style.scss";

function ProductsBOM() {
  return (
    <div className="products-bom">
      <h3>Gphone1</h3>
      <img src={Gphone1BOM} alt="" />
      <h3>Gphone2</h3>
      <img src={Gphone2BOM} alt="" />
      <h3>Gphone3</h3>
      <img src={Gphone3BOM} alt="" />
    </div>
  );
}

export default ProductsBOM;
