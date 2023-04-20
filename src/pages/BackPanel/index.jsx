import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminInfo, sendNotification } from "../../apis/back-panel";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";
import "./style.scss";

function BackPanel() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [notifText, setNotifText] = useState("");
  const [notifType, setNotifType] = useState("SUCCESS");

  const [rAndDBaseTime, setRAndDBaseTime] = useState("");
  const [rAndDCostCoefficient, setRAndDCostCoefficient] = useState("");
  const [increaseMoney, setIncreaseMoney] = useState("");

  useEffect(() => {
    getAdminInfo()
      .then((res) => res.data)
      .then((data) => {})
      .catch((error) => {
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSendNotification = () => {
    sendNotification({ message: notifText, type: notifType })
      .then((res) => res.data)
      .then((data) => {})
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
          <Button type="error">توقف بازی</Button>
          <Button type="success">شروع مجدد بازی</Button>

          <hr />

          <div>ارسال نوتیفیکیشن</div>
          <BasicInput
            value={notifText}
            onChange={(e) => setNotifText(e.target.value)}
            label="متن نوتیفیکیشن:"
          />
          <div>نوع نوتیفیکیشن:</div>
          <select onChange={(e) => setNotifType(e.target.value)}>
            <option value="SUCCESS">success</option>
            <option value="WARNING">warning</option>
            <option value="ERROR">error</option>
          </select>
          <Button onClick={handleSendNotification}>ارسال نوتیفیکیشن</Button>

          <hr />

          <div>افزایش پول همه بازیکنان</div>
          <BasicInput
            value={increaseMoney}
            onChange={(e) => setIncreaseMoney(e.target.value)}
            label="مقدار پول افزایش:"
          />
          <Button>اضافه‌کردن پول به همه بازیکنان</Button>

          <hr />

          <div>تغییر پارامترهای r and d</div>
          <BasicInput
            value={rAndDBaseTime}
            onChange={(e) => setRAndDBaseTime(e.target.value)}
            label="زمان پایه r and d:"
          />
          <BasicInput
            value={rAndDCostCoefficient}
            onChange={(e) => setRAndDCostCoefficient(e.target.value)}
            label="هزینه پایه r and d:"
          />
          <Button>اضافه‌کردن پول به همه بازیکنان</Button>
        </div>
      )}
    </>
  );
}

export default BackPanel;
