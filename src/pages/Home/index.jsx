import React from "react";
import Layout from "../../components/Layout";
import LeftTable from "../../components/LeftTable";
import TradeTable from "../../components/TradeTable";

import "./style.scss";

function Home() {
  return (
    <Layout>
      <div className="home">
        <TradeTable />
        <LeftTable />
      </div>
    </Layout>
  );
}

export default Home;
