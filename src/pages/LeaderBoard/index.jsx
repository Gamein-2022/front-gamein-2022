import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminInfo, getBackPanelLeaderBoard } from "../../apis/back-panel";
import { formatPrice } from "../../utils/formatters";
import "./style.scss";

function BackPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getAdminInfo()
      .then((res) => res.data)
      .then((data) => {
        getBackPanelLeaderBoard()
          .then((res) => res.data)
          .then((data) => {
            setLeaderboard(data?.topTeams);
          });
      })
      .catch((error) => {
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div>
      <h1 className="back-panel__table-title">جدول تیم‌های برتر</h1>
      <div className="back-panel__table">
        <div className="back-panel__table-row">
          <div className="back-panel__table-column">رتبه</div>
          <div className="back-panel__table-column">اسم تیم</div>
          <div className="back-panel__table-column">دارایی</div>
        </div>
        {leaderboard.map((item, index) => (
          <div className="back-panel__table-row">
            <div className="back-panel__table-column">{index + 1}</div>
            <div className="back-panel__table-column">{item?.teamName}</div>
            <div className="back-panel__table-column">
              {formatPrice(item?.wealth)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BackPanel;
