import React, { useState } from "react";
import "./style.scss";
import r1 from "../../../../assets/img/regions/r1.png";
import r1hover from "../../../../assets/img/regions/r1hover.png";
import r1selected from "../../../../assets/img/regions/r1selected.png";
import r2 from "../../../../assets/img/regions/r2.png";
import r2hover from "../../../../assets/img/regions/r2hover.png";
import r2selected from "../../../../assets/img/regions/r2selected.png";
import r3 from "../../../../assets/img/regions/r3.png";
import r3hover from "../../../../assets/img/regions/r3hover.png";
import r3selected from "../../../../assets/img/regions/r3selected.png";
import r4 from "../../../../assets/img/regions/r4.png";
import r4hover from "../../../../assets/img/regions/r4hover.png";
import r4selected from "../../../../assets/img/regions/r4selected.png";
import r5 from "../../../../assets/img/regions/r5.png";
import r5hover from "../../../../assets/img/regions/r5hover.png";
import r5selected from "../../../../assets/img/regions/r5selected.png";
import r6 from "../../../../assets/img/regions/r6.png";
import r6hover from "../../../../assets/img/regions/r6hover.png";
import r6selected from "../../../../assets/img/regions/r6selected.png";
import r7 from "../../../../assets/img/regions/r7.png";
import r7hover from "../../../../assets/img/regions/r7hover.png";
import r7selected from "../../../../assets/img/regions/r7selected.png";
import r8 from "../../../../assets/img/regions/r8.png";
import r8hover from "../../../../assets/img/regions/r8hover.png";
import r8selected from "../../../../assets/img/regions/r8selected.png";

interface RegionsMapProps {
  regionsState: string[];
  setRegionsState: React.Dispatch<React.SetStateAction<string[]>>;
  updateRegionsState: (region: number, state: string) => void;
}

function RegionsMap({
  regionsState,
  setRegionsState,
  updateRegionsState,
}: RegionsMapProps) {
  return (
    <div className="regions-map">
      <div className="regions-map__label regions-map__label-region1">۱</div>
      <div className="regions-map__label regions-map__label-region2">۲</div>
      <div className="regions-map__label regions-map__label-region3">۳</div>
      <div className="regions-map__label regions-map__label-region4">۴</div>
      <div className="regions-map__label regions-map__label-region5">۵</div>
      <div className="regions-map__label regions-map__label-region6">۶</div>
      <div className="regions-map__label regions-map__label-region7">۷</div>
      <div className="regions-map__label regions-map__label-region8">۸</div>
      {regionsState[0] === "selected" ? (
        <img alt="region" src={r1selected} className="regions-map__region1" />
      ) : regionsState[0] === "hovered" ? (
        <img
          alt="region"
          src={r1hover}
          className="regions-map__region1"
          onClick={() => {
            updateRegionsState(0, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(0, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r1}
          className="regions-map__region1"
          onMouseOver={() => {
            updateRegionsState(0, "hovered");
          }}
        />
      )}

      {regionsState[1] === "selected" ? (
        <img alt="region" src={r2selected} className="regions-map__region2" />
      ) : regionsState[1] === "hovered" ? (
        <img
          alt="region"
          src={r2hover}
          className="regions-map__region2"
          onClick={() => {
            updateRegionsState(1, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(1, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r2}
          className="regions-map__region2"
          onMouseOver={() => {
            updateRegionsState(1, "hovered");
          }}
        />
      )}
      {regionsState[2] === "selected" ? (
        <img alt="region" src={r3selected} className="regions-map__region3" />
      ) : regionsState[2] === "hovered" ? (
        <img
          alt="region"
          src={r3hover}
          className="regions-map__region3"
          onClick={() => {
            updateRegionsState(2, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(2, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r3}
          className="regions-map__region3"
          onMouseOver={() => {
            updateRegionsState(2, "hovered");
          }}
        />
      )}
      {regionsState[3] === "selected" ? (
        <img alt="region" src={r4selected} className="regions-map__region4" />
      ) : regionsState[3] === "hovered" ? (
        <img
          alt="region"
          src={r4hover}
          className="regions-map__region4"
          onClick={() => {
            updateRegionsState(3, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(3, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r4}
          className="regions-map__region4"
          onMouseOver={() => {
            updateRegionsState(3, "hovered");
          }}
        />
      )}
      {regionsState[4] === "selected" ? (
        <img alt="region" src={r5selected} className="regions-map__region5" />
      ) : regionsState[4] === "hovered" ? (
        <img
          alt="region"
          src={r5hover}
          className="regions-map__region5"
          onClick={() => {
            updateRegionsState(4, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(4, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r5}
          className="regions-map__region5"
          onMouseOver={() => {
            updateRegionsState(4, "hovered");
          }}
        />
      )}
      {regionsState[5] === "selected" ? (
        <img alt="region" src={r6selected} className="regions-map__region6" />
      ) : regionsState[5] === "hovered" ? (
        <img
          alt="region"
          src={r6hover}
          className="regions-map__region6"
          onClick={() => {
            updateRegionsState(5, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(5, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r6}
          className="regions-map__region6"
          onMouseOver={() => {
            updateRegionsState(5, "hovered");
          }}
        />
      )}
      {regionsState[6] === "selected" ? (
        <img alt="region" src={r7selected} className="regions-map__region7" />
      ) : regionsState[6] === "hovered" ? (
        <img
          alt="region"
          src={r7hover}
          className="regions-map__region7"
          onClick={() => {
            updateRegionsState(6, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(6, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r7}
          className="regions-map__region7"
          onMouseOver={() => {
            updateRegionsState(6, "hovered");
          }}
        />
      )}
      {regionsState[7] === "selected" ? (
        <img alt="region" src={r8selected} className="regions-map__region8" />
      ) : regionsState[7] === "hovered" ? (
        <img
          alt="region"
          src={r8hover}
          className="regions-map__region8"
          onClick={() => {
            updateRegionsState(7, "selected");
          }}
          onMouseLeave={() => {
            updateRegionsState(7, "");
          }}
        />
      ) : (
        <img
          alt="region"
          src={r8}
          className="regions-map__region8"
          onMouseOver={() => {
            updateRegionsState(7, "hovered");
          }}
        />
      )}
    </div>
  );
}

export default RegionsMap;
