import React, { useEffect, useRef, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Button from "../../../Button";
import "./style.scss";
import { getFinalProducts, sellToGamein } from "../../../../apis/trade";
import { toast } from "react-toastify";
import { formatPrice } from "../../../../utils/formatters";
import NumberInput from "../../../NumberInput";
import { getFinalNextTime } from "../../../../apis/orders";
import MyCountDown from "../../../CountDown/MyCountDown";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
function TradeFinal() {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [finalProducts, setFinalProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();
  const [remainedTime, setRemainedTime] = useState();

  useEffect(() => {
    getFinalProducts()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setFinalProducts(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCountDownComplete = () => {
    getFinalNextTime()
      .then((res) => res.data)
      .then((data) => {
        const current = data?.result?.nextTime;
        setRemainedTime((new Date(current) - new Date()) / 1000);
      })
      .catch((error) => console.log(error));
  }

  const handleSellFinalProduct = () => {
    sellToGamein({ productId: selectedProductId, quantity, price })
      .then((res) => res.data)
      .then((_) => {
        toast.success(t`سفارش فروش به گیمین با موفقیت ثبت شد.`);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده است.`
        );
      });
  };

  return (
    <div className="trade-final">
      <div><Trans>زمان باقیمانده تا خرید بعدی گیمین:</Trans> </div>
      <div className="trade-final__remained-time">
        <MyCountDown timeInSeconds={remainedTime} onComplete={handleCountDownComplete}/>
      </div>
      <p>
       <Trans> اینجا می‌تونی محصولات نهایی رو به بازار جهانی عرضه کنی. برای این کار،
        محصول، تعداد و قیمت مورد نظرت رو مشخص کن.</Trans>
      </p>
      <div><Trans>محصول</Trans></div>
      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        className="trade-filter__select trade-final__select"
      >
        <option disabled selected>
<Trans>          انتخاب کن
</Trans>        </option>
        {finalProducts.map((item) => (
          <option value={item.product.id}>{item.product.name}</option>
        ))}
      </select>
      <div>
     <Trans>   حداقل قیمت:</Trans>{" "}
        {formatPrice(
          finalProducts.find((item) => item.product.id == selectedProductId)
            ?.product?.minPrice || 0
        )}
      </div>
      <div>
      <Trans>  حداکثر قیمت:</Trans>{" "}
        {formatPrice(
          finalProducts.find((item) => item.product.id == selectedProductId)
            ?.product?.maxPrice || 0
        )}
      </div>
      <NumberInput
        label={t`قیمت پیشنهادی`}
        placeholder={t`مثلا ۱۰۰۰`}
        min={0}
        value={price}
        onChange={(value) => setPrice(value)}
      />
      <NumberInput
        label={t`تعداد`}
        placeholder={t`مثلا ۵۰۰`}
        min={0}
        step={100}
        value={quantity}
        onChange={(value) => setQuantity(value)}
      />
      <div>
      <Trans>موجودی انبار: </Trans>{" "}
        {
          finalProducts.find((item) => item.product.id == selectedProductId)
            ?.inStorage
        }{" "}
                {  plural(finalProducts.find((item) => item.product.id == selectedProductId)
            ?.inStorage, {
            one: `عدد`,
            other: `عدد`
          })}
      </div>
      {/* <div>
        <img src={coinImg} alt="coin" />
        درآمد حاصل از فروش: {123456}
      </div>
      <div>
        <ErrorOutlineOutlinedIcon />
        متن خطای مربوط به جور نبودن تعداد با تقاضای بازار D:
      </div> */}
      <Button onClick={handleSellFinalProduct}>فروش به بازار</Button>
    </div>
  );
}

export default TradeFinal;
