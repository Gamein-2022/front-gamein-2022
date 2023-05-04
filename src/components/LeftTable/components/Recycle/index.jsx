import React, { useEffect, useState } from "react";
import { getGroundInfo } from "../../../../apis/production";
import ShopBuildings from "../../../RightTable/components/ShopBuildings";
import "./style.scss";

import recycleHallImg from "../../../../assets/recycle-hall.svg";
import GameinLoading from "../../../GameinLoading";
import Line from "../Line";

function Recycle({ updateBuildings }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGroundInfo(0)
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
    getGroundInfo(0)
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
    <div className="ground0">
      {loading && <GameinLoading size={32} />}
      {!loading && (
        <>
          {!data?.building && (
            <>
              <ShopBuildings
                showUpgradeBuilding={false}
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

export default Recycle;
