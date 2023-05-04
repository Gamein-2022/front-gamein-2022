import React, { useEffect } from "react";
import { getGroundLines } from "../../../../../../apis/production";
import "./style.scss";

function Ground1() {
  useEffect(() => {
    getGroundLines(1)
      .then((res) => res.data)
      .then((data) => {})
      .catch((error) => console.log(error));
  }, []);
  return <div>Ground1</div>;
}

export default Ground1;
