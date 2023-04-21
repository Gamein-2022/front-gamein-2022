import React, { useEffect, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import BasicInput from "../../../BasicInput";
import Button from "../../../Button";
import coinImg from "../../../../assets/coin.svg";
import sampleImg from "../../../../assets/img/mapPreview.png";
import "./style.scss";
import { getFinalProducts, sellToGamein } from "../../../../apis/trade";
import { toast } from "react-toastify";

function TradeFinal() {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [finalProducts, setFinalProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();

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

  const handleSellFinalProduct = () => {
    sellToGamein({ productId: selectedProductId, quantity, price })
      .then((res) => res.data)
      .then((data) => {
        toast.success("سفارش فروش به گیمین با موفقیت ثبت شد.");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده است."
        );
      });
  };

  return (
    <div className="trade-final">
      {/* <img src={sampleImg} alt="trade final" /> */}
      <p>
        اینجا می‌تونی محصولات نهایی رو به بازار جهانی عرضه کنی. برای این کار،
        محصول، تعداد و قیمت مورد نظرت رو مشخص کن.
      </p>
      <div>محصول</div>
      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        className="trade-filter__select trade-final__select"
      >
        <option disabled selected>
          انتخاب کن
        </option>
        {finalProducts.map((item) => (
          <option value={item.product.id}>{item.product.name}</option>
        ))}
      </select>
      <div>
        حداقل قیمت:{" "}
        {finalProducts.find((item) => item.product.id == selectedProductId)
          ?.product?.minPrice || 0}
      </div>
      <div>
        حداکثر قیمت:{" "}
        {finalProducts.find((item) => item.product.id == selectedProductId)
          ?.product?.maxPrice || 0}
      </div>
      <BasicInput
        label={"قیمت پیشنهادی"}
        placeholder="مثلا ۱۰۰۰"
        type="number"
        min={0}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <BasicInput
        label={"تعداد"}
        placeholder="مثلا ۵۰۰"
        type="number"
        min={0}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <div>
        موجودی انبار:{" "}
        {
          finalProducts.find((item) => item.product.id == selectedProductId)
            ?.inStorage
        }{" "}
        عدد
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
