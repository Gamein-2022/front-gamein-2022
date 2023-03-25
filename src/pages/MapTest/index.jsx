import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ReactComponent as Map } from "./gamein_map.svg";
import "./style.scss";

const HIDDEN_ITEMS = [
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
  console.log(building);
  building.addEventListener("mouseenter", (e) => {
    e.currentTarget.classList.add("hover");
    e.currentTarget.setAttribute("filter", "url(#softGlow)");
  });
  building.addEventListener("mouseleave", (e) => {
    e.currentTarget.classList.remove("hover");
    e.currentTarget.removeAttribute("filter", "url(#softGlow)");
  });
}

function MapTest() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log("loaded", loaded);
    if (loaded) {
      HIDDEN_ITEMS.forEach((item) => {
        hide(item);
      });
      GLOW.forEach((item) => {
        glow(item);
      });
    }
  }, [loaded]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Layout>
      <div className="map-test">
        {!loaded && "loading..."}
        {loaded && <Map />}
      </div>
    </Layout>
  );
}

export default MapTest;
