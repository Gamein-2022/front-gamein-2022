import React, { useEffect, useState } from "react";
// import { getLines } from "../../../../apis/production";
// import Line from "../Line";

// import productionEmpty from "../../../../assets/empty_states/production_empty.svg";

import "./style.scss";
// import Button from "../../../Button";
// import { useRecoilState } from "recoil";
// import { rightTableOpen, rightTableTab } from "../../../../store/tabs";
// import { RIGHT_TABLE_TABS } from "../../../../constants/tabs";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { productionAndAssemblyInnerTab } from "../../../../store/tabs";
import Ground1 from "./components/Ground1";
import { PRODUCTION_AND_ASSEMBLY_TABS } from "../../../../constants/tabs";
import Ground2 from "./components/Ground2";
import Ground3 from "./components/Ground3";

function ProductionAndAssembly() {
  const [activeTab, setActiveTab] = useRecoilState(
    productionAndAssemblyInnerTab
  );
  // const [lines, setLines] = useState([]);
  // const [rightTab, setRightTab] = useRecoilState(rightTableTab);
  // const [rightOpen, setRightOpen] = useRecoilState(rightTableOpen);

  // useEffect(() => {
  //   getLines()
  //     .then((res) => res.data)
  //     .then((data) => {
  //       console.log(data);

  //       setLines(data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const updateLines = () => {
  //   getLines()
  //     .then((res) => res.data)
  //     .then((data) => {
  //       console.log(data);
  //       setLines(data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="production-and-assembly">
      <div className="production-and-assembly__header">
        <div
          className={classNames("production-and-assembly__header-item", {
            "production-and-assembly__header-item--active":
              activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground1,
          })}
          onClick={() => setActiveTab(PRODUCTION_AND_ASSEMBLY_TABS.ground1)}
        >
          زمین ۱
        </div>
        <div
          className={classNames("production-and-assembly__header-item", {
            "production-and-assembly__header-item--active":
              activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground2,
          })}
          onClick={() => setActiveTab(PRODUCTION_AND_ASSEMBLY_TABS.ground2)}
        >
          زمین ۲
        </div>
        <div
          className={classNames("production-and-assembly__header-item", {
            "production-and-assembly__header-item--active":
              activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground3,
          })}
          onClick={() => setActiveTab(PRODUCTION_AND_ASSEMBLY_TABS.ground3)}
        >
          زمین ۳
        </div>
      </div>
      {activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground1 && <Ground1 />}
      {activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground2 && <Ground2 />}
      {activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground3 && <Ground3 />}
      {/* {lines
        .filter((item) => item.status === "IN_PROGRESS")
        .map((line) => (
          <Line {...line} updateLines={updateLines} />
        ))}
      {lines
        .filter((item) => item.status === "OFF")
        .map((line) => (
          <Line {...line} updateLines={updateLines} />
        ))}
      {lines
        .filter((item) => item.status === "NOT_INITIAL")
        .map((line) => (
          <Line {...line} updateLines={updateLines} />
        ))}
      {lines?.length <= 0 && (
        <div className="production-and-assembly__empty">
          <img src={productionEmpty} alt="empty production" />
          <p>
            هنوز هیچ خط تولید یا مونتاژی نداری. برای شروع، از فروشگاه گیمین سوله
            تولید یا مونتاژ بخر!
          </p>
          <Button
            onClick={() => {
              setRightTab(RIGHT_TABLE_TABS.shop);
              setRightOpen(true);
            }}
          >
            خرید از فروشگاه گیمین
          </Button>
        </div>
      )} */}
    </div>
  );
}

export default ProductionAndAssembly;
