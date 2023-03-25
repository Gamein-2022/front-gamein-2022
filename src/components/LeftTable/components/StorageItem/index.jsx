import React, { useState } from "react";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import "./style.scss";

function StorageItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="storage-item">
      <div className="storage-item__summary">
        <div className="storage-item__name">{item.product.name}</div>
        <div className="storage-item__count">
          {item.inQueueAmount +
            item.inRouteAmount +
            item.inStorageAmount +
            item.manufacturingAmount}
          عدد
        </div>
        <div className="storage-item__percent">{23}%</div>
        <div
          className="storage-item__plus"
          onClick={() => setOpen((old) => !old)}
        >
          {open ? (
            <IndeterminateCheckBoxOutlinedIcon />
          ) : (
            <AddBoxOutlinedIcon />
          )}
        </div>
      </div>
      {open && (
        <div className="storage-item__expansion">
          <div className="storage-item__expansion-item">
            <div className="storage-item__expansion-icon">
              <BreakfastDiningIcon style={{ color: "#2798F2" }} />
            </div>
            <div className="storage-item__expansion-name">کالاهای موجود</div>
            <div className="storage-item__expansion-percent">
              {item.inStorageAmount}
            </div>
            <div></div>
          </div>
          <div className="storage-item__expansion-item">
            <div className="storage-item__expansion-icon">
              <BreakfastDiningIcon style={{ color: "#781E5D" }} />
            </div>
            <div className="storage-item__expansion-name">کالاهای در مسیر</div>
            <div className="storage-item__expansion-percent">
              {item.inRouteAmount}
            </div>
            <div></div>
          </div>
          <div className="storage-item__expansion-item">
            <div className="storage-item__expansion-icon">
              <BreakfastDiningIcon style={{ color: "#255957" }} />
            </div>
            <div className="storage-item__expansion-name">
              کالاهای در حال تولید
            </div>
            <div className="storage-item__expansion-percent">
              {item.manufacturingAmount}
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StorageItem;
