import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useLingui } from "@lingui/react"
import dariaLogoImg from "../../assets/daria-logo.png";
import { useNavigate } from "react-router-dom";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
import "./style.scss";
import { loginApi } from "../../apis/login";
import { toast } from "react-toastify";
import { getInfo } from "../../apis/profile";
import gamein2022Img_fa from "../../assets/gamein-2022_fa.svg";
import gamein2022Img_en from "../../assets/gamein-2022_en.svg";
function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { i18n } = useLingui()
  const navigate = useNavigate();

  useEffect(() => {
    getInfo()
      .then((res) => res.data)
      .then((data) => {
        navigate("/choose-region");
      })
      .catch((error) => {
        if (error?.response?.status !== 401) {
          setHasError(true);
        }
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      console.log("error");
      toast.error(<Trans>نام کاربری یا ایمیل نمی‌تواند خالی باشد.</Trans>);
      return;
    }

    if (!password) {
      toast.error(<Trans>رمز عبور نمی‌تواند خالی باشد.</Trans>);
    }

    setLoading(true);
    loginApi({ email: username, password, phone: username })
      .then((res) => {
        toast.success(<Trans>با موفقیت وارد شدید.</Trans>);
        localStorage.setItem("token", res.data.token);
        navigate("/choose-region", { replace: true });
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          toast.error(<Trans>شماره موبایل یا ایمیل به درستی وارد نشده است.</Trans>);
        } else if (error.response?.status === 400) {
          toast.error(<Trans>اطلاعات به درستی وارد نشده است.</Trans>);
        } else {
          toast.error(<Trans>مشکلی در سامانه رخ داده است.</Trans>);
        }
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
    
      <Helmet>
        <title>{t`ورود`}</title>
      </Helmet>
      {pageLoading && (
        <div className="layout-loader">
          <ScaleLoader color="#000" />
        </div>
      )}
      {!pageLoading && hasError && (
        <div className="layout-error">
          <div><Trans> مشکلی در سامانه رخ داده!</Trans></div>
          <Trans>لطفا دوباره تلاش کنید.</Trans>
        </div>
      )}
      {!loading && !hasError && (
        <div className="login">
          <form className="login__form" onSubmit={handleSubmit} s>
            <img
              className="login__logo"
              src={i18n.locale=="fa"?gamein2022Img_fa:gamein2022Img_en}
              alt="gamein 2022"
            />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login__input"
              placeholder={t`شماره موبایل یا ایمیل`}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login__input"
              placeholder={t`کلمه عبور`}
              type="password"
            />
            <button className="login__btn">
              {loading ? <ClipLoader size={24} color="#D63F26" /> : <Trans>ورود</Trans>}
            </button>
            <a
              href="https://dariahamrah.ir/"
              target="_blank"
              rel="noreferrer"
              className="login__footer"
            >
              <div> <Trans>با حمایت</Trans></div>
              <img src={dariaLogoImg} alt="Daria logo" />
            </a>
          </form>

        </div>


        
      )}
               
    </>
  );
}

export default Login;
