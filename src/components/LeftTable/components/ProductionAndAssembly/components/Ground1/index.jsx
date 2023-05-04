import React, { useEffect } from "react";
import { getGroundLines } from "../../../../../../apis/production";
import ShopBuildings from "../../../../../RightTable/components/ShopBuildings";
import "./style.scss";

function Ground1() {
  useEffect(() => {
    getGroundLines(1)
      .then((res) => res.data)
      .then((data) => {})
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <ShopBuildings />
    </>
  );
}

export default Ground1;
