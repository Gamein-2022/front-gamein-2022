import React, { useEffect, useState } from 'react';
import LeaderboardHeader from './components/LeaderboardHeader';
import cupLogo from '../../assets/cup.svg';
import zebelkhanImg from '../../assets/zebelkhan.svg';
import natureImg from '../../assets/nature.svg';
import markopoloImg from '../../assets/markopolo.svg';
import migmigImg from '../../assets/migmig.svg';

import './style.scss';
import { formatPrice } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { getAdminInfo, getBackPanelLeaderBoard } from '../../apis/back-panel';

function NewLeaderBoard() {
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
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="new-leaderboard">
      <LeaderboardHeader />
      <div className="new-leaderboard__container">
        <div className="new-leaderboard__box-container">
          <div className="new-leaderboard__box new-leaderboard__box-1">
            <h1 className="new-leaderboard__title">جدول رده‌بندی تیم‌ها</h1>
            <div className="new-leaderboard__ranks">
              <div className="new-leaderboard__rank-3">
                <h2 className="new-leaderboard__rank-title">تیم سوم</h2>
                <div className="new-leaderboard__rank-team">
                  {leaderboard[2]?.teamName}
                </div>
                <div className="new-leaderboard__rank-wealth">
                  {formatPrice(leaderboard[2]?.wealth)}
                </div>
              </div>
              <div className="new-leaderboard__rank-1">
                <img
                  className="new-leaderboard__cup-img"
                  src={cupLogo}
                  alt="cup logo"
                />
                <h2 className="new-leaderboard__rank-title">تیم اول</h2>
                <div className="new-leaderboard__rank-team">
                  {leaderboard[0]?.teamName}
                </div>
                <div className="new-leaderboard__rank-wealth">
                  {formatPrice(leaderboard[0]?.wealth)}
                </div>
              </div>
              <div className="new-leaderboard__rank-2">
                <h2 className="new-leaderboard__rank-title">تیم دوم</h2>
                <div className="new-leaderboard__rank-team">
                  {leaderboard[1]?.teamName}
                </div>
                <div className="new-leaderboard__rank-wealth">
                  {formatPrice(leaderboard[1]?.wealth)}
                </div>
              </div>
            </div>
          </div>
          <div className="new-leaderboard__box new-leaderboard__box-2">
            <div className="new-leaderboard__badge new-leaderboard__badge-1">
              <img src={markopoloImg} alt="" />
              <div className="new-leaderboard__badge-bottom">
                <div className="new-leaderboard__badge-title">
                  مارکوپولوی زمانه
                </div>
                <div className="new-leaderboard__badge-desc">
                  بیشترین حجم کالای مبادله شده در گیمین ۲۰۲۲
                </div>
                <div className="new-leaderboard__badge-team">به زودی</div>
              </div>
            </div>
            <div className="new-leaderboard__badge new-leaderboard__badge-2">
              <img src={zebelkhanImg} alt="" />
              <div className="new-leaderboard__badge-bottom">
                <div className="new-leaderboard__badge-title">زبل خان</div>
                <div className="new-leaderboard__badge-desc">
                  بهترین مدیریت موجودی و هزینه انبار در گیمین ۲۰۲۲
                </div>
                <div className="new-leaderboard__badge-team">به زودی</div>
              </div>
            </div>
            <div className="new-leaderboard__badge new-leaderboard__badge-3">
              <img src={migmigImg} alt="" />
              <div className="new-leaderboard__badge-bottom">
                <div className="new-leaderboard__badge-title">میگ میگ</div>
                <div className="new-leaderboard__badge-desc">
                  بیشترین ارتقا رتبه در گیمین ۲۰۲۲s
                </div>
                <div className="new-leaderboard__badge-team">به زودی</div>
              </div>
            </div>
            <div className="new-leaderboard__badge new-leaderboard__badge-4">
              <img src={natureImg} alt="" />
              <div className="new-leaderboard__badge-bottom">
                <div className="new-leaderboard__badge-title">
                  دوستدار محیط زیست
                </div>
                <div className="new-leaderboard__badge-desc">
                  بیشترین میزان بازیافت کالا در گیمین ۲۰۲۲
                </div>
                <div className="new-leaderboard__badge-team">به زودی</div>
              </div>
            </div>
          </div>
        </div>
        <div className="new-leaderboard__box-container">
          <div className="new-leaderboard__box new-leaderboard__box-3">
            <div className="new-leaderboard__table-wrapper">
              <div className="new-leaderboard__table-title">
                تیم‌های اول تا پنجم
              </div>
              <table className="new-leaderboard__table">
                <tr>
                  <td>رتبه</td>
                  <td>اسم تیم</td>
                  <td>دارایی</td>
                </tr>
                {leaderboard
                  .slice(0, 5)
                  .map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.teamName.slice(0, 10)}</td>
                      <td>{formatPrice(item.wealth)}</td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="new-leaderboard__table-wrapper">
              <div className="new-leaderboard__table-title">
                تیم‌های ششم تا دهم
              </div>
              <table className="new-leaderboard__table">
                <tr>
                  <td>رتبه</td>
                  <td>اسم تیم</td>
                  <td>دارایی</td>
                </tr>
                {leaderboard
                  .slice(5, 10)
                  .map((item, index) => (
                    <tr>
                      <td>{index + 6}</td>
                      <td>{item.teamName.slice(0, 10)}</td>
                      <td>{formatPrice(item.wealth)}</td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
          <div className="new-leaderboard__box new-leaderboard__box-4">
            <div className="new-leaderboard__table-wrapper">
              <div className="new-leaderboard__table-title">
                تیم‌های یازدهم تا پانزدهم
              </div>
              <table className="new-leaderboard__table">
                <tr>
                  <td>رتبه</td>
                  <td>اسم تیم</td>
                  <td>دارایی</td>
                </tr>
                {leaderboard
                  .slice(10, 15)
                  .map((item, index) => (
                    <tr>
                      <td>{index + 11}</td>
                      <td>{item.teamName.slice(0, 10)}</td>
                      <td>{formatPrice(item.wealth)}</td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="new-leaderboard__table-wrapper">
              <div className="new-leaderboard__table-title">
                تیم‌های شانزدهم تا بیستم
              </div>
              <table className="new-leaderboard__table">
                <tr>
                  <td>رتبه</td>
                  <td>اسم تیم</td>
                  <td>دارایی</td>
                </tr>
                {leaderboard
                  .slice(15, 20)
                  .map((item, index) => (
                    <tr>
                      <td>{index + 16}</td>
                      <td>{item.teamName.slice(0, 10)}</td>
                      <td>{formatPrice(item.wealth)}</td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLeaderBoard;
