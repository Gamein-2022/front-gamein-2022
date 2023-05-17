import React, { useState } from "react";
import Helmet from "react-helmet";
import gamein2022Img from "../../assets/gamein-2022.svg";
import dariaLogoImg from "../../assets/daria-logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

import { forgetPassword, resetPassword } from "../../apis/forget-password";
import { toast } from "react-toastify";
import "./style.scss";
import { convertNumberToEnglish } from "../../utils/formatters";

function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("forget-password");

  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return <Navigate to={"/my-profile"} />;
  }

  const handleForgetSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    forgetPassword({ phone: convertNumberToEnglish(username) })
      .then(() => {
        setStep("submit-code");
        toast.success(
          "اگر شماره موبایل شما در سامانه موجود باشد، کد فراموشی برای شما ارسال می‌گردد."
        );
      })
      .catch(() => {
        toast.error("مشکلی در سامانه رخ داده است.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (password != passwordAgain) {
      return toast.error("تکرار رمز عبور با رمز عبور متفاوت است!");
    }
    setLoading(true);
    resetPassword({ code, password })
      .then(() => {
        toast.success("رمز عبور شما با موفقیت تغییر یافت!");
        navigate("/login");
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message || "مشکلی در سامانه رخ داده است."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>فراموشی رمز عبور</title>
      </Helmet>

      <div className="forget-password">
        <img
          onClick={() => navigate("/")}
          className="forget-password__logo"
          src={gamein2022Img}
          alt="gamein 2022"
        />
        {step === "forget-password" && (
          <form className="forget-password__form" onSubmit={handleForgetSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="forget-password__input"
              placeholder="شماره موبایل"
            />
            <div
              className="forget-password__forget-password"
              onClick={() => navigate("/login")}
            >
              بازگشت به صفحه ورود
            </div>
            <Button
              type={"white"}
              className="forget-password__btn"
              disabled={loading}
            >
              ارسال کد تایید
            </Button>
          </form>
        )}
        {step === "submit-code" && (
          <form className="forget-password__form" onSubmit={handleResetSubmit}>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="forget-password__input"
              placeholder="کد ارسال شده"
            />
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="forget-password__input"
              placeholder="رمز عبور جدید"
            />
            <input
              type={"password"}
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              className="forget-password__input"
              placeholder="تکرار رمز عبور جدید"
            />
            <div
              className="forget-password__forget-password"
              onClick={() => setStep("forget-password")}
            >
              تغییر شماره موبایل
            </div>
            <Button
              disabled={loading}
              onClick={() => {}}
              type={"white"}
              className="forget-password__btn"
            >
              ثبت رمز عبور جدید
            </Button>
          </form>
        )}
        <a
          href="https://dariahamrah.ir/"
          target="_blank"
          rel="noreferrer"
          className="forget-password__footer"
        >
          <div>با حمایت </div>
          <img src={dariaLogoImg} alt="Daria logo" />
        </a>
      </div>
    </>
  );
}

export default ForgetPassword;
