import React from "react";
import Layout from "../../components/Layout";
import LeftTable from "../../components/LeftTable";
import RightTable from "../../components/RightTable";
import Map from "../Map";

import "./style.scss";

function Home() {
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
