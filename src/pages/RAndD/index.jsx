import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import Layout from "../../components/Layout";
import ResearchAndDevelopTree from "../../components/ResearchAndDevelopTree";
import ResearchAndDevelopPanel from "../../components/ResearchAndDevelopPanel";
import { getResearches } from "../../apis/research";
import { useRecoilValue } from "recoil";
import { yearState } from "../../store/time";
import { toast } from "react-toastify";

import "./style.scss";

const ResearchAndDevelopPage = () => {
  const [refresh, setRefresh] = useState(true);
  const [researches, setResearches] = useState({});
  const year = useRecoilValue(yearState);

  useEffect(() => {
    if (refresh) {
      getResearches()
        .then((res) => {
          setResearches(
            res.data.result.reduce((acc, item) => {
              acc[item.subject.name] = item.status;
              return acc;
            }, {})
          );
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || "خطایی در دریافت اطلاعات روی داد!"
          );
        })
        .finally(() => {
          setRefresh(false);
        });
    }
  }, [refresh]);

  return (
    <div className="research-and-develop-main-container">
      <Helmet>
        <title>تحقیق و توسعه</title>
      </Helmet>
      <ResearchAndDevelopPanel refresh={() => setRefresh(true)} />
      <ResearchAndDevelopTree year={year} technologies={researches} />
    </div>
  );
};

export default ResearchAndDevelopPage;
