import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { getTeamBuildings } from "../../apis/factory";
import LeftTable from "../../components/LeftTable";
import MiddleTable from "../../components/MiddleTable";
import RightTable from "../../components/RightTable";
import Map from "../Map";

import "./style.scss";

function Home() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getTeamBuildings()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setBuildings({ loaded: true, buildings: data?.result });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>کارخانه من</title>
      </Helmet>
      <Map buildings={buildings} />
      <div className="home__bottom-sheet">
        <RightTable />
        <MiddleTable />
        <LeftTable />
      </div>
    </div>
  );
}

export default Home;
