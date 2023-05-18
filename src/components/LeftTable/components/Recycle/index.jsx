import React, { useEffect, useState } from "react";
import {
  deleteBuilding,
  getGroundInfo,
  upgradeBuilding,
} from "../../../../apis/production";
import ShopBuildings from "../../../RightTable/components/ShopBuildings";
import "./style.scss";

import recycleHallImg from "../../../../assets/recycle-hall.svg";
import recycleEmpty from "../../../../assets/empty_states/recycle-empty.svg";
import gameinEmpty from "../../../../assets/empty_states/gamein-empty.svg";
import GameinLoading from "../../../GameinLoading";
import Line from "../Line";
import Button from "../../../Button";
import { toast } from "react-toastify";
import { formatPrice } from "../../../../utils/formatters";
import Modal from "../../../Modal";

function Recycle({ updateBuildings }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "32px 16px",
        color: "#8d8d8d",
        fontSize: 18,
        overflowY: "auto",
        height: "100%",
      }}
    >
      <img style={{width: 32}} src={gameinEmpty} alt="gamein empty" />
      <div
        style={{
          marginBottom: 24,
        }}
      >
        این قسمت در آینده به بازی اضافه میشه :)
      </div>
      <img
        style={{ maxWidth: 180, width: "100%" }}
        src={recycleEmpty}
        alt="recycle"
      />
    </div>
  );
  // const [data, setData] = useState();
  // const [loading, setLoading] = useState(true);
  // const [upgradeBuildingModalOpen, setUpgradeBuildingModalOpen] =
  //   useState(false);
  // const [deleteBuildingModalOpen, setDeleteBuildingModalOpen] = useState(false);
  // const [actionLoading, setActionLoading] = useState(false);
  // const [pageError, setpageError] = useState(false);

  // useEffect(() => {
  //   getGroundInfo(0)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setData(data?.result);
  //     })
  //     .catch((error) => {
  //       setpageError(true);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // const updateGroundInfo = () => {
  //   setLoading(true);
  //   getGroundInfo(0)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setData(data?.result);
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // const handleUpgradeBuilding = () => {
  //   setActionLoading(true);
  //   upgradeBuilding(data?.building?.id)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       toast.success("ساختمان با موفقیت ارتقا یافت.");
  //       updateGroundInfo();
  //       setUpgradeBuildingModalOpen(false);
  //       updateBuildings();
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
  //       );
  //     })
  //     .finally(() => {
  //       setActionLoading(false);
  //     });
  // };

  // const handleDeleteBuilding = () => {
  //   setActionLoading(true);
  //   deleteBuilding(0)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       toast.success("ساختمان با موفقیت حذف شد.");
  //       updateGroundInfo();
  //       updateBuildings();
  //       setDeleteBuildingModalOpen(false);
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
  //       );
  //     })
  //     .finally(() => {
  //       setActionLoading(false);
  //     });
  // };

  // return (
  //   <div className="ground0">
  //     {pageError && <div className="page-error">یه مشکلی پیش اومده!</div>}
  //     {!pageError && (
  //       <>
  //         {loading && <GameinLoading size={32} />}
  //         {!loading && (
  //           <>
  //             {!data?.building && (
  //               <>
  //                 <ShopBuildings
  //                   showUpgradeBuilding={false}
  //                   buildings={[
  //                     {
  //                       name: "سوله بازیافت",
  //                       type: "RECYCLE_FACTORY",
  //                       img: recycleHallImg,
  //                       description: "",
  //                       price: data?.recycleBuildCost,
  //                     },
  //                   ]}
  //                   ground={0}
  //                   updateBuildings={updateBuildings}
  //                   updateGroundInfo={updateGroundInfo}
  //                 />
  //               </>
  //             )}
  //             {data?.building?.lines
  //               .filter((item) => item.status === "IN_PROGRESS")
  //               .map((line) => (
  //                 <Line {...line} updateLines={updateGroundInfo} />
  //               ))}
  //             {data?.building?.lines
  //               .filter((item) => item.status === "OFF")
  //               .map((line) => (
  //                 <Line {...line} updateLines={updateGroundInfo} />
  //               ))}
  //             {data?.building?.lines
  //               .filter((item) => item.status === "NOT_INITIAL")
  //               .map((line) => (
  //                 <Line {...line} updateLines={updateGroundInfo} />
  //               ))}
  //             {data?.building && (
  //               <div className="shop-buildings__btns">
  //                 {data?.building && !data?.building?.isUpgraded && (
  //                   <Button
  //                     onClick={() => setUpgradeBuildingModalOpen(true)}
  //                     className="shop-buildings__upgrade-btn"
  //                   >
  //                     ارتقای ساختمان
  //                   </Button>
  //                 )}
  //                 {data?.building && (
  //                   <Button
  //                     type="error"
  //                     onClick={() => setDeleteBuildingModalOpen(true)}
  //                     className="shop-buildings__upgrade-btn"
  //                   >
  //                     حذف ساختمان
  //                   </Button>
  //                 )}
  //               </div>
  //             )}
  //           </>
  //         )}
  //         <Modal
  //           open={upgradeBuildingModalOpen}
  //           onClose={() => setUpgradeBuildingModalOpen(false)}
  //         >
  //           <div>آیا مطمئن هستید می‌خواهید ساختمان را ارتقا دهید؟</div>
  //           <div>
  //             هزینه ارتقا ساختمان: {formatPrice(data?.building?.upgradeCost)}{" "}
  //             جی‌کوین
  //           </div>
  //           <div className="extend-ground__btns">
  //             <Button
  //               className="extend-ground__btn-yes"
  //               onClick={handleUpgradeBuilding}
  //               disabled={actionLoading}
  //             >
  //               بله
  //             </Button>
  //             <Button
  //               onClick={() => setUpgradeBuildingModalOpen(false)}
  //               type="error"
  //               disabled={actionLoading}
  //             >
  //               بازگشت
  //             </Button>
  //           </div>
  //         </Modal>
  //         <Modal
  //           open={deleteBuildingModalOpen}
  //           onClose={() => setDeleteBuildingModalOpen(false)}
  //         >
  //           <div>آیا مطمئن هستید می‌خواهید ساختمان را حذف کنید؟</div>
  //           <div className="extend-ground__btns">
  //             <Button
  //               className="extend-ground__btn-yes"
  //               onClick={handleDeleteBuilding}
  //               disabled={actionLoading}
  //             >
  //               بله
  //             </Button>
  //             <Button
  //               onClick={() => setDeleteBuildingModalOpen(false)}
  //               type="error"
  //               disabled={actionLoading}
  //             >
  //               بازگشت
  //             </Button>
  //           </div>
  //         </Modal>
  //       </>
  //     )}
  //   </div>
  // );
}

export default Recycle;
