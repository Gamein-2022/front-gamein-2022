import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addTeam,
  getAdminInfo,
  getBackPanelLeaderBoard,
  increaseUsersMoney,
  pauseGame,
  registerNewUser,
  resumeGame,
  sendAnnnouncement,
  sendNews,
  sendNotification,
  startOverGame,
} from "../../apis/back-panel";
import Button from "../../components/Button";
import { formatPrice } from "../../utils/formatters";
import "./style.scss";
import BasicInput from "../../components/BasicInput";
import Modal from "../../components/Modal";

function BackPanel() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [startGameModalOpen, setStartGameModalOpen] = useState(false);
  const [stopGameModalOpen, setStopGameModalOpen] = useState(false);
  const [resumeGameModalOpen, setResumeGameModalOpen] = useState(false);

  const [notifText, setNotifText] = useState("");
  const [notifType, setNotifType] = useState("SUCCESS");

  const [rAndDBaseTime, setRAndDBaseTime] = useState("");
  const [rAndDCostCoefficient, setRAndDCostCoefficient] = useState("");
  const [increaseMoney, setIncreaseMoney] = useState("");

  const [leaderboard, setLeaderboard] = useState([]);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [addTeamPassword, setAddTeamPassword] = useState("");
  const [username, setUsername] = useState("");
  const [team, setTeam] = useState("");

  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsDate, setNewsDate] = useState("");

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [announcementImage, setAnnouncementImage] = useState("");
  const [announcementDate, setAnnouncementDate] = useState("");

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

  const handleSendNotification = () => {
    sendNotification({ message: notifText, type: notifType })
      .then((res) => res.data)
      .then((data) => {
        toast.success("عملیات با موفقیت انجام شد.");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleIncreaseMoney = () => {
    increaseUsersMoney({ value: increaseMoney })
      .then((res) => res.data)
      .then((data) => {
        toast.success("پول به همه بازیکنان اضافه شد.");
      })
      .catch((error) => console.log(error));
  };

  const handleStopGame = () => {
    pauseGame()
      .then((res) => res.data)
      .then((data) => {
        toast.success("عملیات با موفقیت انجام شد.");
        setStopGameModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleStartOverGame = () => {
    startOverGame()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("عملیات با موفقیت انجام شد.");
        setStartGameModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleResumeGame = () => {
    resumeGame()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("عملیات با موفقیت انجام شد.");
        setResumeGameModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleRegisterNewUser = () => {
    registerNewUser({ phone, email, password: registerPassword })
      .then((res) => res.data)
      .then((data) => {
        toast.success("کاربر جدید اضافه شد");
        setPhone("");
        setEmail("");
        setRegisterPassword("");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleAddTeam = () => {
    addTeam({ username, password: addTeamPassword, teamName: team })
      .then((res) => res.data)
      .then((data) => {
        toast.success("کاربر به تیم اضافه شد");
        setUsername("");
        setAddTeamPassword("");
        setTeam("");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleSendNews = () => {
    sendNews({
      title: newsTitle,
      description: newsDescription,
      date: newsDate,
      image: newsImage,
    })
      .then((res) => res.data)
      .then((data) => {
        toast.success("خبر اضافه شد.");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleSendAnnouncement = () => {
    sendAnnnouncement({
      title: announcementTitle,
      description: announcementDescription,
      date: announcementDate,
      image: announcementImage,
    })
      .then((res) => res.data)
      .then((data) => {
        toast.success("اطلاعیه اضافه شد.");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <>
      {!loading && (
        <div className="back-panel">
          <Button onClick={() => setStartGameModalOpen(true)} type="info">
            شروع بازی جدید
          </Button>
          <Button onClick={() => setStopGameModalOpen(true)} type="error">
            توقف بازی
          </Button>
          <Button onClick={() => setResumeGameModalOpen(true)} type="success">
            ادامه بازی
          </Button>

          <hr />

          <div>ارسال نوتیفیکیشن</div>
          <BasicInput
            value={notifText}
            onChange={(e) => setNotifText(e.target.value)}
            label="متن نوتیفیکیشن:"
          />
          <div>نوع نوتیفیکیشن:</div>
          <select onChange={(e) => setNotifType(e.target.value)}>
            <option value="SUCCESS">success</option>
            <option value="WARNING">warning</option>
            <option value="ERROR">error</option>
            <option value="GAME_PAUSED">game paused</option>
            <option value="GAME_RESUMED">game resumed</option>
            <option value="REFRESH">refresh window</option>
          </select>
          <Button onClick={handleSendNotification}>ارسال نوتیفیکیشن</Button>

          <hr />

          <div>افزایش پول همه بازیکنان</div>
          <BasicInput
            value={increaseMoney}
            onChange={(e) => setIncreaseMoney(e.target.value)}
            label="مقدار پول افزایش:"
          />
          <Button onClick={handleIncreaseMoney}>
            اضافه‌کردن پول به همه بازیکنان
          </Button>
        </div>
      )}
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
      <div className="back-panel">
        <div className="back-panel__register">
          <div>ارسال خبر</div>
          <BasicInput
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            label="عنوان خبر:"
          />
          <BasicInput
            value={newsDate}
            onChange={(e) => setNewsDate(e.target.value)}
            label="تاریخ خبر:"
          />
          <div>توضیح خبر:</div>
          <textarea
            value={newsDescription}
            onChange={(e) => setNewsDescription(e.target.value)}
            type="textarea"
            style={{ width: "100%" }}
          />
          <BasicInput
            value={newsImage}
            onChange={(e) => setNewsImage(e.target.value)}
            label="آدرس تصویر خبر:"
          />
          <Button onClick={handleSendNews}>ارسال خبر</Button>
        </div>
        <div className="back-panel__register">
          <div>ارسال اطلاعیه</div>
          <BasicInput
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            label="عنوان اطلاعیه:"
          />
          <BasicInput
            value={announcementDate}
            onChange={(e) => setAnnouncementDate(e.target.value)}
            label="تاریخ اطلاعیه:"
          />
          <div>توضیح اطلاعیه</div>
          <textarea
            value={announcementDescription}
            onChange={(e) => setAnnouncementDescription(e.target.value)}
            type="textarea"
            style={{ width: "100%" }}
          />
          <BasicInput
            value={announcementImage}
            onChange={(e) => setAnnouncementImage(e.target.value)}
            label="آدرس تصویر اطلاعیه:"
          />
          <Button onClick={handleSendAnnouncement}>ارسال اطلاعیه</Button>
        </div>
        <div className="back-panel__register">
          <div>ثبت‌نام کاربر جدید</div>
          <BasicInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="شماره همراه"
          />
          <BasicInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="ایمیل"
          />
          <BasicInput
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            label="رمز عبور"
          />
          <Button onClick={handleRegisterNewUser}>ثبت کاربر جدید</Button>
        </div>
        <div className="back-panel__register">
          <div>اضافه‌کردن کاربر به تیم</div>
          <BasicInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="ایمیل یا شماره همراه"
          />
          <BasicInput
            value={addTeamPassword}
            onChange={(e) => setAddTeamPassword(e.target.value)}
            label="رمز عبور"
          />
          <BasicInput
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            label="اسم تیم"
          />
          <Button onClick={handleAddTeam}>اضافه‌کردن کاربر به تیم</Button>
        </div>

        <div>تغییر پارامترهای r and d</div>
        <BasicInput
          value={rAndDBaseTime}
          onChange={(e) => setRAndDBaseTime(e.target.value)}
          label="زمان پایه r and d:"
        />
        <BasicInput
          value={rAndDCostCoefficient}
          onChange={(e) => setRAndDCostCoefficient(e.target.value)}
          label="هزینه پایه r and d:"
        />
        <Button>تغییر پارامترهای r and d</Button>
      </div>
      <Modal
        open={startGameModalOpen}
        onClose={() => setStartGameModalOpen(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید بازی را مجدد شروع کنید؟</div>
        <div className="extend-ground__btns">
          <Button
            className="extend-ground__btn-yes"
            onClick={handleStartOverGame}
          >
            بله
          </Button>
          <Button onClick={() => setStartGameModalOpen(false)} type="error">
            بازگشت
          </Button>
        </div>
      </Modal>
      <Modal
        open={stopGameModalOpen}
        onClose={() => setStopGameModalOpen(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید بازی را متوقف کنید؟</div>
        <div className="extend-ground__btns">
          <Button className="extend-ground__btn-yes" onClick={handleStopGame}>
            بله
          </Button>
          <Button onClick={() => setStopGameModalOpen(false)} type="error">
            بازگشت
          </Button>
        </div>
      </Modal>
      <Modal
        open={resumeGameModalOpen}
        onClose={() => setResumeGameModalOpen(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید ادامه بازی را شروع کنید؟</div>
        <div className="extend-ground__btns">
          <Button className="extend-ground__btn-yes" onClick={handleResumeGame}>
            بله
          </Button>
          <Button onClick={() => setResumeGameModalOpen(false)} type="error">
            بازگشت
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default BackPanel;
