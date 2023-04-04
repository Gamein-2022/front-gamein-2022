import React, { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { getInitialRegion } from "../../apis/region";
import Region from "./components/Region";
import RegionsMap from "./components/RegionsMap";
import "./style.scss";

const REGIONS = [
  {
    title: "منطقه یک",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
  {
    title: "منطقه دو",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
  {
    title: "منطقه سه",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
  {
    title: "منطقه چهار",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
  {
    title: "منطقه پنج",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
  {
    title: "منطقه شش",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
  {
    title: "منطقه هفت",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
  {
    title: "منطقه هشت",
    resources: "Sillicon, Glass, Copper, Speaker, Processors",
  },
];

function ChooseRegion() {
  const [regionsState, setRegionsState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const ws = useRef();
  const [prices, setPrices] = useState([]);
  const [populations, setPopulations] = useState([]);
  const selectedRegion = regionsState.findIndex((item) => item === "selected");
  const [remainedTime, setRemainedTime] = useState("00:00");
  const [initialRemainedTimeState, setInitialRemainedTimeState] = useState(0);

  useEffect(() => {
    getInitialRegion()
      .then((res) => res.data)
      .then((data) => {
        console.log("data", data);
        const currentRegion = +data.teamRegionId;
        setInitialRemainedTimeState(+data.remainingTime || 200000);
        if (currentRegion > 0) {
          setRegionsState(() => {
            const temp = ["", "", "", "", "", "", "", ""];
            temp[currentRegion - 1] = "selected";
            return temp;
          });
        }
      })
      .catch((error) => {});

    ws.current = new WebSocket("ws://185.97.117.47/region");

    ws.current.onopen = function (event) {
      console.log("connecting to ws....");
    };

    ws.current.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("recieved: ", data);
      if (data.event === "UPDATE_INFO") {
        setPrices(data.regionPrice);
        setPopulations(data.regionPopulation);
      } else if (data.event === "SET_REGION") {
        if (!data.success) {
          // TODO get current region with http req and set it
        } else {
          const currentRegion = +data.teamRegionId;
          if (currentRegion > 0) {
            setRegionsState(() => {
              const temp = ["", "", "", "", "", "", "", ""];
              temp[currentRegion - 1] = "selected";
              return temp;
            });
          }
        }
      }
    };
  }, []);

  useEffect(() => {
    if (initialRemainedTimeState > 0) {
      let initialRemainedTime = initialRemainedTimeState * 1000;
      const x = setInterval(function () {
        var minutes = Math.floor(
          (initialRemainedTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        var seconds = Math.floor((initialRemainedTime % (1000 * 60)) / 1000);
        setRemainedTime(
          `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`
        );

        // If the count down is finished, write some text
        if (initialRemainedTime < 0) {
          clearInterval(x);
        }
        initialRemainedTime -= 1000;
      }, 1000);
    }
  }, [initialRemainedTimeState]);

  const updateRegionsState = (region, state) => {
    setRegionsState((old) => {
      let newState = [...old];
      if (state === "selected") {
        newState = newState.map((item) => (item === "selected" ? "" : item));
      }
      newState[region] = state;
      return newState;
    });
    if (state === "selected") {
      ws.current?.send(
        JSON.stringify({
          event: "SET_REGION",
          token: "Bearer " + localStorage.getItem("token"),
          regionId: region + 1,
        })
      );
    }
  };
  return (
    <div className="choose-region">
      <Helmet>
        <title>انتخاب منطقه</title>
      </Helmet>
      <div className="choose-region__container">
        <h1 className="choose-region__title">
          سلام، به گیمین ۲۰۲۲ خوش اومدین!
        </h1>
        <div className="choose-region__description-time-wrapper">
          <p className="choose-region__description">
            اولین قدم در شروع این بازی، انتخاب منطقه‌ایه که می‌خواید کارخونه‌ی
            خودتون رو توش بسازین. هر کدوم از این منطقه‌ها، مشخصاتی دارن که تو
            روند بازی موثره پس تو انتخابتون دقت کنین و با استراتژی تصمیم بگیرین
            :)
          </p>

          <div className="choose-region__time">
            <div className="choose-region__time-value">{remainedTime}</div>
            <div className="choose-region__time-title">
              تا پایان انتخاب منطقه
            </div>
          </div>
        </div>

        <div className="choose-region__regions-wrapper">
          <div className="choose-region__regions-description">
            {REGIONS.map((region, index) => (
              <Region
                key={index}
                title={region.title}
                resources={region.resources}
                population={populations[index]}
                price={prices[index]}
                chosen={index === selectedRegion}
                onClick={() => updateRegionsState(index, "selected")}
              />
            ))}
          </div>
          <RegionsMap
            regionsState={regionsState}
            setRegionsState={setRegionsState}
            updateRegionsState={updateRegionsState}
          />
        </div>
      </div>
    </div>
  );
}

export default ChooseRegion;
