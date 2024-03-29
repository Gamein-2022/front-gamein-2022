import { useState } from "react";
import gameinGearLogo from "../../../../assets/gamein_gear_gray.svg";
import Button from "../../../Button";

import "./style.scss";
import NotInitialed from "./NotInitialed";
import Off from "./Off";
import InProgress from "./InProgress";
import { GROUPS } from "../../../../constants/groups";

function Line({
  status,
  id,
  type,
  product,
  updateLines,
  group,
  ...otherProps
}) {
  const [setupLineModelOpen, setSetupLineModelOpen] = useState(false);
  const [initialLineModelOpen, setInitialLineModelOpen] = useState(false);

  const lineTypeString =
    type === "PRODUCTION"
      ? "تولید"
      : type === "ASSEMBLY"
      ? "مونتاژ"
      : "بازیافت";

  return (
    <>
      {status === "NOT_INITIAL" && (
        <div className={`line line--${status}`}>
          <div className="line__header">
            <div>خط {lineTypeString}</div>
            <img src={gameinGearLogo} alt="gamein gear logo" />
          </div>
          <div className="line__body">
            <div>
              برای {lineTypeString} کالا،‌ خط {lineTypeString}ت رو پیش
              راه‌اندازی کن!
            </div>
            <Button
              type="info"
              onClick={() => {
                setInitialLineModelOpen(true);
              }}
            >
              پیش راه‌اندازی
            </Button>
          </div>
          {initialLineModelOpen && (
            <NotInitialed
              open={initialLineModelOpen}
              onClose={() => setInitialLineModelOpen(false)}
              updateLines={updateLines}
              lineId={id}
              modalType={type}
              group={group}
              {...{ lineTypeString }}
            />
          )}
        </div>
      )}
      {status === "OFF" && (
        <div className={`line line--${status}`}>
          <div className="line__header">
            <div>
              خط {lineTypeString}{" "}
              {type === "RECYCLE" ? "" : GROUPS[group] || group}
            </div>
            <img src={gameinGearLogo} alt="gamein gear logo" />
          </div>
          <div className="line__body">
            <div>
              برای {lineTypeString} کالا،‌ خط {lineTypeString}ت رو راه‌اندازی
              کن!
            </div>
            <Button
              type="info"
              onClick={() => {
                setSetupLineModelOpen(true);
              }}
            >
              راه‌اندازی
            </Button>
          </div>
          {setupLineModelOpen && (
            <Off
              updateLines={updateLines}
              open={setupLineModelOpen}
              onClose={() => setSetupLineModelOpen(false)}
              lineId={id}
              modalType={type}
              group={group}
              {...{ lineTypeString }}
            />
          )}
        </div>
      )}
      {status === "IN_PROGRESS" && (
        <InProgress
          updateLines={updateLines}
          lineId={id}
          product={product}
          group={group}
          {...{ lineTypeString, ...otherProps }}
        />
      )}
    </>
  );
}

export default Line;
