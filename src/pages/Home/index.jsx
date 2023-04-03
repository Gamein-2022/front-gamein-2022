import React, { useEffect, useState } from "react";
import { getTeamBuildings } from "../../apis/factory";
import Layout from "../../components/Layout";
import LeftTable from "../../components/LeftTable";
import RightTable from "../../components/RightTable";
import Map from "../Map";

import "./style.scss";

function Home() {
  // const [time, setTime] = useState();
  const [buildings, setBuildings] = useState([]);
  // useEffect(() => {
  //   getTime()
  //     .then((res) => res.data)
  //     .then((data) => {
  //       console.log("************************");
  //       console.log(data);
  //       setTime(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (time) {
  //     const id = setInterval(() => {
  //       let { day, month, year } = time;
  //       day += 1;
  //       if (day > 30) {
  //         day = 1;
  //         month += 1;
  //         if (month > 12) {
  //           month = 1;
  //           year += 1;
  //         }
  //       }
  //       setTime((old) => ({ ...old, day, month, year }));
  //     }, 6000);
  //     return () => {
  //       clearInterval(id);
  //     };
  //   }
  // }, [time]);

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
    <Layout>
      <div className="home">
        <Map buildings={buildings} />
        <div className="home__bottom-sheet">
          <RightTable />
          <LeftTable />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
