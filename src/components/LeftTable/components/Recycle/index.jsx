import React, { useEffect, useState } from "react";
import { getGroundInfo } from "../../../../apis/production";
import ShopBuildings from "../../../RightTable/components/ShopBuildings";
import "./style.scss";

import recycleHallImg from "../../../../assets/recycle-hall.svg";

function Recycle({ updateBuildings }) {
  const [data, setData] = useState();

  useEffect(() => {
    getGroundInfo(0)
      .then((res) => res.data)
      .then((data) => {
        setData(data?.result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="ground0">
      {!data?.building && (
        <>
          <ShopBuildings
            buildings={[
              {
                name: "سوله بازیافت",
                type: "RECYCLE_FACTORY",
                img: recycleHallImg,
                description: "",
                price: data?.recycleBuildCost,
              },
            ]}
            ground={0}
            updateBuildings={updateBuildings}
          />
        </>
      )}
    </div>
  );
}

export default Recycle;
