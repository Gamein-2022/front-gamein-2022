import React, { useEffect, useState } from "react";
import { getGroundInfo } from "../../../../../../apis/production";
import ShopBuildings from "../../../../../RightTable/components/ShopBuildings";
import "./style.scss";

import productionHallImg from "../../../../../../assets/production-hall.svg";
import assemblyHallImg from "../../../../../../assets/assembly-hall.svg";

function Ground1({ updateBuildings }) {
  const [data, setData] = useState();

  useEffect(() => {
    getGroundInfo(1)
      .then((res) => res.data)
      .then((data) => {
        setData(data?.result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="ground1">
      {!data?.building && (
        <>
          <ShopBuildings
            buildings={[
              {
                name: "سوله تولید",
                type: "PRODUCTION_FACTORY",
                img: productionHallImg,
                description: "دارای دو خط تولید، قابل ارتقا به سه خط",
                price: data?.productionBuildCost,
              },
              {
                name: "سوله مونتاژ",
                type: "ASSEMBLY_FACTORY",
                img: assemblyHallImg,
                description: "دارای سه خط مونتاژ، قابل ارتقا به چهار خط",
                price: data?.assemblyBuildCost,
              },
            ]}
            ground={1}
            updateBuildings={updateBuildings}
          />
        </>
      )}
    </div>
  );
}

export default Ground1;
