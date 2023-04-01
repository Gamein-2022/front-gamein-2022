import React, { useState } from "react";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import "./style.scss";
import Button from "../../../Button";
import Modal from "../../../Modal";
import BasicInput from "../../../BasicInput";
import { removeFromStorage } from "../../../../apis/storage";
import { toast } from "react-toastify";

function StorageItem({ item, storageSpace, updateStorageInfo }) {
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);

  const onClose = () => {
    setDeleteModalOpen(false);
    setDeleteCount(0);
  };

  const handleDeleteFromStorage = () => {
    removeFromStorage({ productId: item?.product?.id, quantity: deleteCount })
      .then((res) => res.data)
      .then((data) => {
        toast.success(
          `${deleteCount} عدد ${item?.product?.name} از انبار حذف شد.`
        );
        onClose();
        updateStorageInfo();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <div className="storage-item">
      <div className="storage-item__summary">
        <div className="storage-item__name">{item.product.name}</div>
        <div className="storage-item__count">
          {item.inStorageAmount + item.manufacturingAmount}
          عدد
        </div>
        <div className="storage-item__percent">
          {(
            ((item.inStorageAmount + item.manufacturingAmount) / storageSpace) *
            item.product.unitVolume *
            100
          ).toFixed(1)}
          %
        </div>
        <div className="storage-item__btns">
          <div
            className="storage-item__plus"
            onClick={() => setOpen((old) => !old)}
          >
            {open ? (
              <IndeterminateCheckBoxOutlinedIcon fontSize="large" />
            ) : (
              <AddBoxOutlinedIcon fontSize="large" />
            )}
          </div>
          <Button
            className="storage-item__delete"
            onClick={() => setDeleteModalOpen(true)}
          >
            <DeleteForeverOutlinedIcon fontSize="small" />
          </Button>
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
      <Modal open={deleteModalOpen} onClose={onClose}>
        <div>چه تعداد {item?.product?.name} از انبار حذف بشه؟</div>
        <BasicInput
          type="number"
          min="0"
          value={deleteCount}
          onChange={(e) => setDeleteCount(e.target.value)}
        />
        <div>ظرفیت آزاد شونده: {deleteCount * item?.product?.unitVolume}</div>
        <div className="storage-item__modal-btns">
          <Button
            onClick={handleDeleteFromStorage}
            className="storage-item__modal-delete"
          >
            حذف از انبار
          </Button>
          <Button type="error" onClick={onClose}>
            بازگشت
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default StorageItem;
