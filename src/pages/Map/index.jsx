import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { upgradeRegion } from "../../apis/factory";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { LEFT_TABLE_TABS, RIGHT_TABLE_TABS } from "../../constants/tabs";
import { updateRegionModalOpen } from "../../store/modals";
import {
  leftTableOpen,
  leftTableTab,
  rightTableOpen,
  rightTableTab,
} from "../../store/tabs";
import { ReactComponent as MapImage } from "./gamein_map.svg";
import "./style.scss";

let HIDDEN_ITEMS = [
  "recycling_facility_building",
  "ground_3_assembly_facility",
  "ground_2_assembly_facility",
  "ground_1_assembly_facility",
  "ground_3_production_facility",
  "ground_2_production_facility",
  "ground_1_production_facility",
  "ground_3_inventory",
  "ground_3_unfinished_building",
  "ground_3_tree",
  "ground_3_asphalt",
];

let SHOW_ITEMS = [];

const GLOW = [
  "recycling_facility",
  "dock",
  "dock_boat",
  "gamein_store",
  "inventory",
  "transactions_office",
  "ground_1",
  "ground_2",
  "ground_3",
  "ali_heidari",
  "r_and_d_facility",
];

function hide(id) {
  try {
    const building = document.getElementById(id);
    building.classList.add("hide");
  } catch (error) {
    return;
  }
}

function show(id) {
  try {
    const building = document.getElementById(id);
    building.classList.remove("hide");
  } catch (error) {
    return;
  }
}

function glow(id) {
  const building = document.getElementById(id);
  building.classList.add("building");
}

function Map({ buildings, updateBuildings }) {
  const setRightTableActiveTab = useSetRecoilState(rightTableTab);
  const setRightTableOpen = useSetRecoilState(rightTableOpen);

  const setLeftTableActiveTab = useSetRecoilState(leftTableTab);
  const setLeftTableOpen = useSetRecoilState(leftTableOpen);

  const navigate = useNavigate();

  const [updateRegionModalOpenState, setUpdateRegionModalOpenState] =
    useRecoilState(updateRegionModalOpen);

  useEffect(() => {
    // add functionality
    document.getElementById("gamein_store").addEventListener("click", () => {
      setRightTableActiveTab(RIGHT_TABLE_TABS.shop);
      setRightTableOpen(true);
    });

    document
      .getElementById("r_and_d_facility")
      .addEventListener("click", () => {
        navigate("/r-and-d");
      });

    document
      .getElementById("transactions_office")
      .addEventListener("click", () => {
        setRightTableActiveTab(RIGHT_TABLE_TABS.deals);
        setRightTableOpen(true);
      });

    document.getElementById("inventory").addEventListener("click", () => {
      setLeftTableActiveTab(LEFT_TABLE_TABS.storage);
      setLeftTableOpen(true);
    });

    document
      .getElementById("ground_3_inventory")
      .addEventListener("click", () => {
        setLeftTableActiveTab(LEFT_TABLE_TABS.storage);
        setLeftTableOpen(true);
      });

    document.getElementById("ground_3_locked").addEventListener("click", () => {
      setUpdateRegionModalOpenState(true);
    });

    if (buildings?.regionUpgraded) {
      HIDDEN_ITEMS.push("ground_3_locked");
      HIDDEN_ITEMS.push("fences_extra");
      show("ground_3_unfinished_building");
      HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
        (item) => item !== "ground_3_unfinished_building"
      );
    }

    SHOW_ITEMS = [];

    const hasRecycleFactory =
      buildings?.buildings?.filter((item) => item.type === "RECYCLE_FACTORY")
        .length > 0;
    if (hasRecycleFactory) {
      HIDDEN_ITEMS.push("recycling_facility_unfinished_building");
      SHOW_ITEMS.push("recycling_facility_building");
    }
    buildings?.buildings.forEach((building) => {
      const ground = building?.ground;
      if (ground === 1) {
        if (building.type === "PRODUCTION_FACTORY") {
          SHOW_ITEMS.push("ground_1_production_facility");
        } else if (building.type === "ASSEMBLY_FACTORY") {
          SHOW_ITEMS.push("ground_1_assembly_facility");
        }
        HIDDEN_ITEMS.push("ground_1_unfinished_building");
      } else if (ground === 2) {
        if (building.type === "PRODUCTION_FACTORY") {
          SHOW_ITEMS.push("ground_2_production_facility");
        } else if (building.type === "ASSEMBLY_FACTORY") {
          SHOW_ITEMS.push("ground_2_assembly_facility");
        }
        HIDDEN_ITEMS.push("ground_2_unfinished_building");
      } else if (ground === 3) {
        HIDDEN_ITEMS.push("fences_extra");
        HIDDEN_ITEMS.push("ground_3_locked");
        HIDDEN_ITEMS.push("ground_3_unfinished_building");
        HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
          (item) => item !== "ground_3_asphalt"
        );
        if (building.type === "PRODUCTION_FACTORY") {
          SHOW_ITEMS.push("ground_3_production_facility");
        } else if (building.type === "ASSEMBLY_FACTORY") {
          SHOW_ITEMS.push("ground_3_assembly_facility");
        } else {
          SHOW_ITEMS.push("ground_3_inventory");
        }
      }
    });
    HIDDEN_ITEMS.forEach((item) => {
      hide(item);
    });
    GLOW.forEach((item) => {
      glow(item);
    });
    SHOW_ITEMS.forEach((item) => {
      show(item);
    });
  }, [buildings]);

  const handleUpgradeRegion = () => {
    upgradeRegion()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setUpdateRegionModalOpenState(false);
        toast.success("زمین گسترش یافت.");
        updateBuildings();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <div className="map">
      <MapImage />
      <Modal
        open={updateRegionModalOpenState}
        onClose={() => setUpdateRegionModalOpenState(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید زمین را گسترش دهید؟</div>
        <Button onClick={handleUpgradeRegion}>بله</Button>
        <Button
          onClick={() => setUpdateRegionModalOpenState(false)}
          type="error"
        >
          بازگشت
        </Button>
      </Modal>
    </div>
  );
}

export default Map;
