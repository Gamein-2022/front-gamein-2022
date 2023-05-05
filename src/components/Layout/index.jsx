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
import { Trans } from '@lingui/macro';
import { t } from '@lingui/macro';
const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const setBalance = useSetRecoilState(balanceState);
  const setInfo = useSetRecoilState(infoState);
  const [isGamePaused, setIsGamePaused] = useRecoilState(isGamePausedState);

  const navigate = useNavigate();

  useEffect(() => {
    getInitialRegion()
      .then((res) => res.data)
      .then((data) => {
        if (data.remainingTime > 0) {
          navigate("/choose-region");
        }
      });
    getInfo()
      .then((res) => res.data)
      .then((data) => {
        setBalance(data.balance);
        setInfo(data);
        if (data?.isGamePaused) {
          setIsGamePaused(data?.isGamePaused);
        }
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
          <div>
<Trans>بازی فعلا متوقف شده است
</Trans>

            !</div>
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
              <div><Trans> مشکلی در سامانه رخ داده!</Trans></div>
<Trans>لطفا دوباره تلاش کنید.
</Trans>            </div>
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
