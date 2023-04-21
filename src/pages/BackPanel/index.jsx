import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAdminInfo,
  increaseUsersMoney,
  pauseGame,
  resumeGame,
  sendNotification,
  startOverGame,
} from "../../apis/back-panel";
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

  const handleIncreaseMoney = () => {
    increaseUsersMoney({ value: increaseMoney })
      .then((res) => res.data)
      .then((data) => {
        toast.success("پول به همه بازیکنان اضافه شد.");
      })
      .catch((error) => console.log(error));
  };

  const handleStopGame = () => {
    pauseGame()
      .then((res) => res.data)
      .then((data) => {})
      .catch((error) => console.log(error));
  };

  const handleStartOverGame = () => {
    startOverGame()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleResumeGame = () => {
    resumeGame()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {!loading && (
        <div className="back-panel">
          <Button onClick={handleStartOverGame} type="info">
            شروع بازی جدید
          </Button>
          <Button onClick={handleStopGame} type="error">
            توقف بازی
          </Button>
          <Button onClick={handleResumeGame} type="success">
            ادامه بازی
          </Button>

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
            <option value="GAME_PAUSED">game paused</option>
            <option value="GAME_RESUMED">game resumed</option>
          </select>
          <Button onClick={handleSendNotification}>ارسال نوتیفیکیشن</Button>

          <hr />

          <div>افزایش پول همه بازیکنان</div>
          <BasicInput
            value={increaseMoney}
            onChange={(e) => setIncreaseMoney(e.target.value)}
            label="مقدار پول افزایش:"
          />
          <Button onClick={handleIncreaseMoney}>
            اضافه‌کردن پول به همه بازیکنان
          </Button>

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
          <Button>تغییر پارامترهای r and d</Button>
        </div>
      )}
    </>
  );
}

export default BackPanel;