import React, { useCallback, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { getTeamBuildings } from "../../apis/factory";
import LeftTable from "../../components/LeftTable";
import MiddleTable from "../../components/MiddleTable";
import RightTable from "../../components/RightTable";
import Map from "../Map";

import "./style.scss";

function Home({ parentRef }) {
  const [buildings, setBuildings] = useState([]);
  const [buildingsLoaded, setBuildingsLoaded] = useState(false);

  const updateBuildings = () => {
    getTeamBuildings()
      .then((res) => res.data)
      .then((data) => {
        setBuildings(data?.result || []);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    parentRef.current.updateBuildings = updateBuildings;
    getTeamBuildings()
      .then((res) => res.data)
      .then((data) => {
        setBuildingsLoaded(true);
        setBuildings(data?.result || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>کارخانه من</title>
      </Helmet>
      {buildingsLoaded && (
        <Map buildings={buildings} updateBuildings={updateBuildings} />
      )}
      <div className="home__bottom-sheet">
        <RightTable />
        <MiddleTable />
        <LeftTable updateBuildings={updateBuildings} />
      </div>
    </div>
  );
}

export default Home;
