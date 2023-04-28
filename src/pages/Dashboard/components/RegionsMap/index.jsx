import React from "react";
import { useRecoilValue } from "recoil";

import region1 from "../../../../assets/guide/Region1.png";
import region2 from "../../../../assets/guide/Region2.png";
import region3 from "../../../../assets/guide/Region3.png";
import region4 from "../../../../assets/guide/Region4.png";
import region5 from "../../../../assets/guide/Region5.png";
import region6 from "../../../../assets/guide/Region6.png";
import region7 from "../../../../assets/guide/Region7.png";
import region8 from "../../../../assets/guide/Region8.png";
import { infoState } from "../../../../store/team-info";
import "./style.scss";

const IMAGES = [
  region1,
  region2,
  region3,
  region4,
  region5,
  region6,
  region7,
  region8,
];

function RegionsMap() {
  const teamInfo = useRecoilValue(infoState);
  return (
    <div className="dashboard-regions-map">
      <img src={IMAGES[teamInfo?.region - 1]} alt="" />
    </div>
  );
}

export default RegionsMap;
