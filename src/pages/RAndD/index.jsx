import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ResearchAndDevelopTree from "../../components/ResearchAndDevelopTree";
import ResearchAndDevelopPanel from "../../components/ResearchAndDevelopPanel";
import { getResearches } from "../../apis/research";
import { useRecoilValue } from "recoil";
import { yearState } from "../../store/time";

import styles from "./style.module.scss";

const ResearchAndDevelopPage = () => {
  const [researches, setResearches] = useState({});
  const [selected, setSelected] = useState(null);
  const year = useRecoilValue(yearState);

  useEffect(() => {
    getResearches().then((res) => {
      setResearches(
        res.data.result.reduce((acc, item) => {
          acc[item.subject.name] = item.status;
          return acc;
        }, {})
      );
    });
  }, []);
  console.log("r&d year", year);

  return (
    <Layout>
      <div className={styles["research-and-develop-main-container"]} dir="ltr">
        <ResearchAndDevelopTree
          year={year}
          technologies={researches}
          setSelected={setSelected}
        />

        <ResearchAndDevelopPanel selected={selected} current={null} />
      </div>
    </Layout>
  );
};

export default ResearchAndDevelopPage;
