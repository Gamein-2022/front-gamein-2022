import React from 'react';
import LeaderboardHeader from './components/LeaderboardHeader';
import cupLogo from '../../assets/cup.svg';
import zebelkhanImg from '../../assets/zebelkhan.svg';
import natureImg from '../../assets/nature.svg';
import markopoloImg from '../../assets/markopolo.svg';
import migmigImg from '../../assets/migmig.svg';

import './style.scss';
import { formatPrice } from '../../utils/formatters';

function NewLeaderBoard() {
  return (
    <div className="new-leaderboard">
      <LeaderboardHeader />
      <div className="new-leaderboard__container">
        <div className="new-leaderboard__box-container">
          <div className="new-leaderboard__box new-leaderboard__box-1">
            <h1 className="new-leaderboard__title">جدول رده‌بندی تیم‌ها</h1>
            <div className="new-leaderboard__ranks">
              <div className="new-leaderboard__rank-3">
                <h2>تیم سوم</h2>
                <div>teamname</div>
                <div>{formatPrice(123456789)}</div>
              </div>
              <div className="new-leaderboard__rank-1">
                <img
                  className="new-leaderboard__cup-img"
                  src={cupLogo}
                  alt="cup logo"
                />
                <h2>تیم اول</h2>
                <div>teamname</div>
                <div>{formatPrice(123456789)}</div>
              </div>
              <div className="new-leaderboard__rank-2">
                <h2>تیم دوم</h2>
                <div>teamname</div>
                <div>{formatPrice(123456789)}</div>
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
                {Array(5)
                  .fill(null)
                  .map(() => (
                    <tr>
                      <td>رتبه</td>
                      <td>اسم تیم</td>
                      <td>دارایی</td>
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
                {Array(5)
                  .fill(null)
                  .map(() => (
                    <tr>
                      <td>رتبه</td>
                      <td>اسم تیم</td>
                      <td>دارایی</td>
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
                {Array(5)
                  .fill(null)
                  .map(() => (
                    <tr>
                      <td>رتبه</td>
                      <td>اسم تیم</td>
                      <td>دارایی</td>
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
                {Array(5)
                  .fill(null)
                  .map(() => (
                    <tr>
                      <td>رتبه</td>
                      <td>اسم تیم</td>
                      <td>دارایی</td>
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
