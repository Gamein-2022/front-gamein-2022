import React, { useEffect, useState } from "react";
import { ReactComponent as Map } from "./gamein_map.svg";
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
  "ground_3_tree",
];

const GLOW = [
  "recycling_facility_building",
  "recycling_facility_unfinished_building",
  "dock",
  "dock_boat",
  "gamein_store",
  "inventory",
  "transactions_office",
  "ground_3_assembly_facility",
  "ground_2_assembly_facility",
  "ground_1_assembly_facility",
  "ground_3_production_facility",
  "ground_2_production_facility",
  "ground_1_production_facility",
  "ground_3_inventory",
  "ground_3_tree",
  "ground_3_unfinished_building",
  "ground_2_unfinished_building",
  "ground_1_unfinished_building",
];

function hide(id) {
  try {
    const building = document.getElementById(id);
    console.log(building);
    building.classList.add("hide");
  } catch (error) {
    return;
  }
}

function glow(id) {
  const building = document.getElementById(id);
  building.classList.add("building");
  console.log(building);
  building.addEventListener("mouseenter", (e) => {
    e.currentTarget.setAttribute("filter", "url(#softGlow)");
  });
  building.addEventListener("mouseleave", (e) => {
    e.currentTarget.removeAttribute("filter", "url(#softGlow)");
  });
}

function MapTest({ buildings }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log("loaded", loaded);
    if (loaded && buildings?.loaded) {
      const hasRecycleFactory =
        buildings.buildings.filter((item) => item.type === "RECYCLE_FACTORY")
          .length > 0;
      if (hasRecycleFactory) {
        HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
          (item) => item !== "recycling_facility_building"
        );
        HIDDEN_ITEMS.push("recycling_facility_unfinished_building");
      }
      buildings.buildings
        .filter((item) => item.type !== "RECYCLE_FACTORY")
        .forEach((building, index) => {
          if (index === 0) {
            if (building.type === "PRODUCTION_FACTORY") {
              HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
                (item) => item !== "ground_1_production_facility"
              );
            } else if (building.type === "ASSEMBLY_FACTORY") {
              HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
                (item) => item !== "ground_1_assembly_facility"
              );
            }
            HIDDEN_ITEMS.push("ground_1_unfinished_building");
          } else if (index === 1) {
            if (building.type === "PRODUCTION_FACTORY") {
              HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
                (item) => item !== "ground_2_production_facility"
              );
            } else if (building.type === "ASSEMBLY_FACTORY") {
              HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
                (item) => item !== "ground_2_assembly_facility"
              );
            }
            HIDDEN_ITEMS.push("ground_2_unfinished_building");
          } else if (index === 2) {
            if (building.type === "PRODUCTION_FACTORY") {
              HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
                (item) => item !== "ground_3_production_facility"
              );
            } else if (building.type === "ASSEMBLY_FACTORY") {
              HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
                (item) => item !== "ground_3_assembly_facility"
              );
            }else {
              HIDDEN_ITEMS = HIDDEN_ITEMS.filter(
                (item) => item !== "ground_3_inventory"
              );
            }
            HIDDEN_ITEMS.push("ground_3_unfinished_building");
          }
        });
      HIDDEN_ITEMS.forEach((item) => {
        hide(item);
      });
      GLOW.forEach((item) => {
        glow(item);
      });
    }
  }, [loaded, buildings]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="map">
      {!loaded && "loading..."}
      {loaded && <Map />}
    </div>
  );
}

export default MapTest;
