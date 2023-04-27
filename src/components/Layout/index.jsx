import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import LayoutHeader from "../LayoutHeader";
import { getInfo } from "../../apis/profile";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { balanceState, infoState } from "../../store/team-info";

import "./style.scss";
import { isGamePausedState } from "../../store/time";
import GameinLoading from "../GameinLoading";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const setBalance = useSetRecoilState(balanceState);
  const setInfo = useSetRecoilState(infoState);
  const isGamePaused = useRecoilValue(isGamePausedState);

  const navigate = useNavigate();

  useEffect(() => {
    getInfo()
      .then((res) => res.data)
      .then((data) => {
        setBalance(data.balance);
        setInfo(data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate("/login");
        } else {
          setHasError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(isGamePaused);

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
  );
};

export default Layout;
