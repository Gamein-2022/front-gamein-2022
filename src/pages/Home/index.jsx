import React, { useEffect } from "react";
import { getTime } from "../../apis/time";
import Layout from "../../components/Layout";
import LeftTable from "../../components/LeftTable";
import RightTable from "../../components/RightTable";
import Map from "../Map";

import "./style.scss";

function Home() {
  useEffect(() => {
    getTime()
      .then((res) => res.data)
      .then((data) => {
        console.log("************************");
        console.log(data);
      });
  }, []);
  return (
    <Layout>
      <div className="home">
        <Map />
        <div className="home__bottom-sheet">
          <RightTable />
          <LeftTable />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
