import React, { useEffect, useState } from "react";
import { getLines } from "../../../../apis/production";
import Line from "../Line";

import productionEmpty from "../../../../assets/empty_states/production_empty.svg";

import "./style.scss";
import Button from "../../../Button";
import { useRecoilState } from "recoil";
import { rightTableOpen, rightTableTab } from "../../../../store/tabs";
import { RIGHT_TABLE_TABS } from "../../../../constants/tabs";

function ProductionAndAssembly() {
  const [lines, setLines] = useState([]);
  const [rightTab, setRightTab] = useRecoilState(rightTableTab);
  const [rightOpen, setRightOpen] = useRecoilState(rightTableOpen);

  useEffect(() => {
    getLines()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setLines(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateLines = () => {
    getLines()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setLines(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="production-and-assembly">
      {lines.map((line) => (
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
      )}
    </div>
  );
}

export default ProductionAndAssembly;
