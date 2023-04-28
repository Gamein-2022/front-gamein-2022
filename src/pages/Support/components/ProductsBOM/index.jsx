import React from "react";
import Gphone1BOM from "../../../../assets/guide/Gphone1BOM.svg";
import Gphone2BOM from "../../../../assets/guide/Gphone2BOM.svg";
import Gphone3BOM from "../../../../assets/guide/Gphone3BOM.svg";
import Gphone4BOM from "../../../../assets/guide/Gphone4BOM.svg";
import Gphone5BOM from "../../../../assets/guide/Gphone5BOM.svg";
import Gphone6BOM from "../../../../assets/guide/Gphone6BOM.svg";
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
      <h3>Gphone4</h3>
      <img src={Gphone4BOM} alt="" />
      <h3>Gphone5</h3>
      <img src={Gphone5BOM} alt="" />
      <h3>Gphone6</h3>
      <img src={Gphone6BOM} alt="" />
    </div>
  );
}

export default ProductsBOM;
