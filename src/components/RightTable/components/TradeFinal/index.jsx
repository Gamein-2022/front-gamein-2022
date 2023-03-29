import React from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import BasicInput from "../../../BasicInput";
import Button from "../../../Button";
import coinImg from "../../../../assets/coin.svg";
import sampleImg from "../../../../assets/img/mapPreview.png";
import "./style.scss";

function TradeFinal() {
  return (
    <div className="trade-final">
      <img src={sampleImg} alt="trade final" />
      <p>
        اینجا می‌تونی محضولات نهایی رو به بازار جهانی عرضه کنی. برای این کار،
        محصول، تعداد و قیمت مورد نظرت رو مشخص کن. با توجه به تقاضای بازار بهت
        گفته میشه که می‌تونی با این قیمت و تعداد بفروشی یا نه :)
      </p>
      <div>محصول</div>
      <select className="trade-filter__select">
        <option disabled selected>
          انتخاب کن
        </option>
        <option>copper</option>
        <option>cobalt</option>
      </select>
      <BasicInput
        label={"قیمت پیشنهادی"}
        placeholder="مثلا ۱۰۰۰"
        type="number"
      />
      <BasicInput label={"تعداد"} placeholder="مثلا ۵۰۰" type="number" />
      <div>موجودی انبار: {1000} عدد</div>
      <div>
        <img src={coinImg} alt="coin" />
        درآمد حاصل از فروش: {123456}
      </div>
      <div>
        <ErrorOutlineOutlinedIcon />
        متن خطای مربوط به جور نبودن تعداد با تقاضای بازار D:
      </div>
      <Button>فروش به بازار</Button>
    </div>
  );
}

export default TradeFinal;
