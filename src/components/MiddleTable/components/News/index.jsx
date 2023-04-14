import React from "react";
import "./style.scss";

import s7 from "../../../../assets/s7.webp";

function News() {
  return (
    <div>
      {[1, 2, 4].map(() => (
        <div className="new">
          <img className="new__img" src={s7} alt="" />
          <div className="new__left">
            <div className="new__title">
              رونمایی از گوشی Samsung Galaxy S7 Edge
            </div>
            <div className="new__description">
              سال ۲۰۱۶ در چنین روزی، شرکت کنندگان کنگره جهانی موبایل در بارسلون
              اسپانیا، شاهد رونمایی از گوشی‌های galaxy S7 و galaxy S7 Edge
              سامسونگ بودند.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
