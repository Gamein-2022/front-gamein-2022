import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import LayoutHeader from "../LayoutHeader";
import { getInfo } from "../../apis/profile";

import { useRecoilState, useSetRecoilState } from "recoil";
import { balanceState, infoState } from "../../store/team-info";

import "./style.scss";
import { isGamePausedState } from "../../store/time";
import GameinLoading from "../GameinLoading";
import { getInitialRegion } from "../../apis/region";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const setBalance = useSetRecoilState(balanceState);
  const setInfo = useSetRecoilState(infoState);
  const [isGamePaused, setIsGamePaused] = useRecoilState(isGamePausedState);
  const [isGameLoading, setIsGameLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getInitialRegion()
      .then((res) => res.data)
      .then((data) => {
        if (data.remainingTime > 0) {
          navigate("/choose-region");
          return;
        }
        if (data.remainingTime >= -10 && data.remainingTime <= 0) {
          setIsGameLoading(true);
          setTimeout(() => {
            window.location.reload();
          }, (10 + data.remainingTime + 2) * 1000);
        }
      });
    getInfo()
      .then((res) => res.data)
      .then((data) => {
        setBalance(data.balance);
        setInfo(data);
        // if (data?.isGamePaused) {
        //   setIsGamePaused(data?.isGamePaused);
        // }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate("/login");
        } else if (error?.response?.status === 423) {
          setIsGamePaused(true);
        } else {
          setHasError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {isGamePaused && (
        <div className="game-paused">
          <GameinLoading size={100} duration={"2s"} />
          <div>بازی فعلا متوقف شده است!</div>
        </div>
      )}
      {!isGamePaused && (
        <>
          {isGameLoading && (
            <div className="game-paused">
              <GameinLoading size={100} duration={"2s"} />
              <div>در حال انتقال به صفحه بازی...</div>
            </div>
          )}
          {!isGameLoading && (
            <>
              {loading && (
                <div className="layout-loader">
                  <ScaleLoader color="#000" />
                </div>
              )}
              {!loading && hasError && (
                <div className="layout-error">
                  <div> مشکلی در سامانه رخ داده!</div>
                  لطفا دوباره تلاش کنید.
                </div>
              )}
              {!loading && !hasError && (
                <div className="layout">
                  <LayoutHeader />
                  <div className="layout-body">
                    <Outlet />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Layout;
