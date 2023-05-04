import "./style.scss";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { productionAndAssemblyInnerTab } from "../../../../store/tabs";
import Ground1 from "./components/Ground1";
import { PRODUCTION_AND_ASSEMBLY_TABS } from "../../../../constants/tabs";
import Ground2 from "./components/Ground2";
import Ground3 from "./components/Ground3";

function ProductionAndAssembly({ updateBuildings }) {
  const [activeTab, setActiveTab] = useRecoilState(
    productionAndAssemblyInnerTab
  );

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
      {activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground1 && (
        <Ground1 updateBuildings={updateBuildings} />
      )}
      {activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground2 && (
        <Ground2 updateBuildings={updateBuildings} />
      )}
      {activeTab === PRODUCTION_AND_ASSEMBLY_TABS.ground3 && (
        <Ground3 updateBuildings={updateBuildings} />
      )}
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
