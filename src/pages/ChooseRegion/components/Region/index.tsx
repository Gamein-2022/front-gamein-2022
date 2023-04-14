import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CheckIcon from "@mui/icons-material/Check";
import TokenIcon from "@mui/icons-material/Token";
import "./style.scss";
import classNames from "classnames";

interface RegionProps {
  title: string;
  resources: string;
  population: string;
  price: string;
  chosen?: boolean;
  onClick?: () => void;
}

function Region({
  title,
  onClick,
  chosen,
  resources,
  population,
  price,
}: RegionProps) {
  return (
    <div
      onClick={onClick}
      className={classNames("region", { "region--chosen": chosen })}
    >
      <div className="region__content">
        <div className="region__top">
          <div className="region__title">{title}</div>
          <div className="region__resources">
            <div className="region__resources-title">
              <TokenIcon />
              منابع موجود:
            </div>
            <div className="region__resources-description">{resources}</div>
          </div>
        </div>
        <div className="region__bottom">
          <div className="region__population">
            <GroupsIcon />
            جمعیت حاضر: {population}
          </div>
          <div className="region__price">
            <MonetizationOnIcon />
            قیمت زمین: {price}
          </div>
        </div>
      </div>
      {chosen ? (
        <div className="region__chosen-by-you">
          <CheckIcon />
          انتخاب شما
        </div>
      ) : (
        <div className="region__chosen-by-you-empty"></div>
      )}
    </div>
  );
}

export default Region;
