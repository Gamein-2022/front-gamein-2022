import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ResearchAndDevelopTree from "../../components/ResearchAndDevelopTree";
import ResearchAndDevelopPanel from "../../components/ResearchAndDevelopPanel";
import { getResearches } from "../../apis/research";
import { useRecoilValue } from "recoil";
import { yearState } from "../../store/time";
import { toast } from "react-toastify";

import styles from "./style.module.scss";

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
    <div className={styles["research-and-develop-main-container"]} dir="ltr">
      <ResearchAndDevelopTree year={year} technologies={researches} />
      <ResearchAndDevelopPanel refresh={() => setRefresh(true)} />
    </div>
  );
};

export default ResearchAndDevelopPage;
