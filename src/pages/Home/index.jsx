import React from "react";
import Layout from "../../components/Layout";
import TradeTable from "../../components/TradeTable";

import "./style.scss";

function Home() {
  return (
    <Layout>
      <div className="home">
        <TradeTable />
      </div>
    </Layout>
  );
}

export default Home;
