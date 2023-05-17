import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAdminInfo,
  sendAnnnouncement,
  sendNews,
} from "../../apis/back-panel";
import Button from "../../components/Button";
import "./style.scss";
import BasicInput from "../../components/BasicInput";

function BackPanel() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsDate, setNewsDate] = useState("2004/12/26");

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [announcementImage, setAnnouncementImage] = useState("");
  const [announcementDate, setAnnouncementDate] = useState("2004/12/26");

  useEffect(() => {
    getAdminInfo()
      .then((res) => res.data)
      .then((data) => {})
      .catch((error) => {
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSendNews = () => {
    sendNews({
      title: newsTitle,
      description: newsDescription,
      date: newsDate,
      image: newsImage,
    })
      .then((res) => res.data)
      .then((data) => {
        toast.success("خبر اضافه شد.");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleSendAnnouncement = () => {
    sendAnnnouncement({
      title: announcementTitle,
      description: announcementDescription,
      date: announcementDate,
      image: announcementImage,
    })
      .then((res) => res.data)
      .then((data) => {
        toast.success("اطلاعیه اضافه شد.");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <>
      {!loading && (
        <div className="back-panel">
          <div className="back-panel__register">
            <div>ارسال خبر</div>
            <BasicInput
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              label="عنوان خبر:"
            />
            <BasicInput
              value={newsDate}
              onChange={(e) => setNewsDate(e.target.value)}
              label="تاریخ خبر:"
            />
            <div>توضیح خبر:</div>
            <textarea
              value={newsDescription}
              onChange={(e) => setNewsDescription(e.target.value)}
              type="textarea"
              style={{ width: "100%" }}
            />
            <BasicInput
              value={newsImage}
              onChange={(e) => setNewsImage(e.target.value)}
              label="آدرس تصویر خبر:"
            />
            <Button onClick={handleSendNews}>ارسال خبر</Button>
          </div>
          <div className="back-panel__register">
            <div>ارسال اطلاعیه</div>
            <BasicInput
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
              label="عنوان اطلاعیه:"
            />
            <BasicInput
              value={announcementDate}
              onChange={(e) => setAnnouncementDate(e.target.value)}
              label="تاریخ اطلاعیه:"
            />
            <div>توضیح اطلاعیه</div>
            <textarea
              value={announcementDescription}
              onChange={(e) => setAnnouncementDescription(e.target.value)}
              type="textarea"
              style={{ width: "100%" }}
            />
            <BasicInput
              value={announcementImage}
              onChange={(e) => setAnnouncementImage(e.target.value)}
              label="آدرس تصویر اطلاعیه:"
            />
            <Button onClick={handleSendAnnouncement}>ارسال اطلاعیه</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default BackPanel;
