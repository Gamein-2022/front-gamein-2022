import React, { useEffect, useState } from "react";
import { getGroundInfo } from "../../../../../../apis/production";
import ShopBuildings from "../../../../../RightTable/components/ShopBuildings";
import "./style.scss";

import productionHallImg from "../../../../../../assets/production-hall.svg";
import assemblyHallImg from "../../../../../../assets/assembly-hall.svg";
import GameinLoading from "../../../../../GameinLoading";
import Line from "../../../Line";
import Button from "../../../../../Button";

function Ground1({ updateBuildings }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGroundInfo(1)
      .then((res) => res.data)
      .then((data) => {
        setData(data?.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateGroundInfo = () => {
    setLoading(true);
    getGroundInfo(1)
      .then((res) => res.data)
      .then((data) => {
        setData(data?.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="ground1">
      {loading && <GameinLoading size={32} />}
      {!loading && (
        <>
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
                updateGroundInfo={updateGroundInfo}
              />
            </>
          )}
          {data?.building && !data?.building?.isUpgraded && (
            <Button className="shop-buildings__upgrade-btn">
              ارتقای ساختمان
            </Button>
          )}
          {data?.building?.lines
            .filter((item) => item.status === "IN_PROGRESS")
            .map((line) => (
              <Line {...line} updateLines={updateGroundInfo} />
            ))}
          {data?.building?.lines
            .filter((item) => item.status === "OFF")
            .map((line) => (
              <Line {...line} updateLines={updateGroundInfo} />
            ))}
          {data?.building?.lines
            .filter((item) => item.status === "NOT_INITIAL")
            .map((line) => (
              <Line {...line} updateLines={updateGroundInfo} />
            ))}
        </>
      )}
    </div>
  );
}

export default Ground1;
