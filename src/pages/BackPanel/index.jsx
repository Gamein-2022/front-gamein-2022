import React, { useState } from "react";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";
import "./style.scss";

function BackPanel() {
  const [notifText, setNotifText] = useState("");
  const [rAndDBaseTime, setRAndDBaseTime] = useState("");
  const [rAndDCostCoefficient, setRAndDCostCoefficient] = useState("");
  const [increaseMoney, setIncreaseMoney] = useState("");

  return (
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
      <select>
        <option value="success">success</option>
        <option value="warning">warning</option>
        <option value="error">error</option>
      </select>
      <Button>ارسال نوتیفیکیشن</Button>

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
  );
}

export default BackPanel;
