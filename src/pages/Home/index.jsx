import React, { useEffect, useState } from "react";
import { getTime } from "../../apis/time";
import Layout from "../../components/Layout";
import LeftTable from "../../components/LeftTable";
import RightTable from "../../components/RightTable";
import Map from "../Map";

import "./style.scss";

function Home() {
  const [time, setTime] = useState();
  useEffect(() => {
    getTime()
      .then((res) => res.data)
      .then((data) => {
        console.log("************************");
        console.log(data);
        setTime(data);
      });
  }, []);

  useEffect(() => {
    if (time) {
      const id = setInterval(() => {
        let { day, month, year } = time;
        day += 1;
        if (day > 30) {
          day = 1;
          month += 1;
          if (month > 12) {
            month = 1;
            year += 1;
          }
        }
        setTime((old) => ({ ...old, day, month, year }));
      }, 6000);
      return () => {
        clearInterval(id);
      };
    }
  }, [time]);

  return (
    <Layout>
      <div className="home">
        <Map />
        <div className="home__time-balance">
          <div className="home__time">{`${time?.year}/${time?.month}/${time?.day}`}</div>
          <div className="home__balance"></div>
        </div>
        <div className="home__bottom-sheet">
          <RightTable />
          <LeftTable />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
