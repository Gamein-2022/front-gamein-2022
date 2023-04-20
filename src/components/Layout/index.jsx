import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import LayoutHeader from "../LayoutHeader";
import { getInfo } from "../../apis/profile";

import { useSetRecoilState } from "recoil";
import { balanceState } from "../../store/team-info";

import "./style.scss";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const setBalance = useSetRecoilState(balanceState);

  const navigate = useNavigate();

  useEffect(() => {
    getInfo()
      .then((res) => res.data)
      .then((data) => {
        setBalance(data.balance);
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

  return (
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
  );
};

export default Layout;
