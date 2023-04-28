import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import ResearchAndDevelopTree from "../../components/ResearchAndDevelopTree";
import ResearchAndDevelopPanel from "../../components/ResearchAndDevelopPanel";
import { getResearches } from "../../apis/research";
import { toast } from "react-toastify";

import "./style.scss";
import { getTime } from "../../apis/time";

const ResearchAndDevelopPage = () => {
  const [refresh, setRefresh] = useState(true);
  const [researches, setResearches] = useState({});
  const [era, setEra] = useState(0);

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

  useEffect(() => {
    if (refresh) {
      getTime().then((res) => {
        setEra(res.data.era);
      });
    }
  }, [refresh]);

  return (
    <div className="research-and-develop-main-container">
      <Helmet>
        <title>تحقیق و توسعه</title>
      </Helmet>
      <ResearchAndDevelopPanel refresh={() => setRefresh(true)} />
      <ResearchAndDevelopTree era={era} technologies={researches} />
    </div>
  );
};

export default ResearchAndDevelopPage;
