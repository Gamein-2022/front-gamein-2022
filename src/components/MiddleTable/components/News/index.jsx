import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getNews } from "../../../../apis/back-panel";
import Button from "../../../Button";
import GameinLoading from "../../../GameinLoading";
import "./style.scss";

function News() {
  const [news, setNews] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const updateNews = () => {
    setActionLoading(true);
    getNews()
      .then((res) => res.data)
      .then((data) => {
        setNews(data?.result?.reverse());
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      })
      .finally(() => {
        setActionLoading(false);
      });
  };
  useEffect(() => {
    getNews()
      .then((res) => res.data)
      .then((data) => {
        setNews(data?.result?.reverse());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);
  return (
    <div>
      {pageLoading && <GameinLoading size={32} />}
      {!pageLoading && (
        <>
          <Button
            disabled={actionLoading}
            onClick={updateNews}
            type={"blue"}
            style={{ margin: "16px auto" }}
          >
            به‌روزرسانی اخبار
          </Button>
          {news.map((news) => (
            <div className="new">
              <img className="new__img" src={"" || news?.image} alt="" />
              <div className="new__left">
                <div className="new__title">{news?.title}</div>
                <div className="new__date">{news?.date}</div>
                <div className="new__description">{news?.description}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default News;
