import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAnnnouncements } from "../../../../apis/back-panel";
import Button from "../../../Button";
import GameinLoading from "../../../GameinLoading";
import "./style.scss";

function Announcments() {
  const [announcments, setAnnouncments] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const updateAnnouncments = () => {
    setActionLoading(true);
    getAnnnouncements()
      .then((res) => res.data)
      .then((data) => {
        setAnnouncments(data?.result);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  useEffect(() => {
    getAnnnouncements()
      .then((res) => res.data)
      .then((data) => {
        setAnnouncments(data?.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  return (
    <div>
      {pageLoading && <GameinLoading size={32} />}
      {!pageLoading && (
        <>
          <Button
            disabled={actionLoading}
            onClick={updateAnnouncments}
            type={"blue"}
            style={{ margin: "16px auto" }}
          >
            به‌روزرسانی اطلاعیه‌ها
          </Button>
          {announcments.map((announcment) => (
            <div className="announcement">
              <img
                className="announcement__img"
                src={announcment?.image}
                alt=""
              />
              <div className="announcement__left">
                <div className="announcement__title">{announcment?.title}</div>
                <div className="announcement__date">{announcment?.date}</div>
                <div className="announcement__description">
                  {announcment?.description}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Announcments;
