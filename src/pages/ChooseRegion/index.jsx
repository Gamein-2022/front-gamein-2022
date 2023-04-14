import React, { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getInitialRegion } from "../../apis/region";
import Region from "./components/Region";
import RegionsMap from "./components/RegionsMap";
import "./style.scss";

const REGIONS = [
  {
    title: "منطقه یک",
    resources: "Glass, Copper, Cobalt, Chips, Processors",
  },
  {
    title: "منطقه دو",
    resources: "Copper, Aluminum, Cobalt, Chips, Processors",
  },
  {
    title: "منطقه سه",
    resources: "Lithium, Copper, Cobalt, Silicon, Speaker, Vibration Motor",
  },
  {
    title: "منطقه چهار",
    resources: "Plastic, Glass, Lithium, Aluminum, Chips, Ports",
  },
  {
    title: "منطقه پنج",
    resources: "Plastic, Lithium, Copper, Microphone, Vibration Motor",
  },
  {
    title: "منطقه شش",
    resources: "Plastic, Glass, Silicon, Microphone, Chips, Speaker, Vibration Motor",
  },
  {
    title: "منطقه هفت",
    resources: "Plastic, Lithium, Cobalt, Silicon, Ports, Processors",
  },
  {
    title: "منطقه هشت",
    resources: "Plastic, Aluminum, Cobalt, Microphone, Chips, Ports, Vibration Motor",
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
  const navigate = useNavigate();

  useEffect(() => {
    getInitialRegion()
      .then((res) => res.data)
      .then((data) => {
        console.log("data", data);
        const currentRegion = +data.teamRegionId;
        if (+data?.remainedTime) {
        }
        setInitialRemainedTimeState(+data?.remainingTime || 30);
        if (currentRegion > 0) {
          setRegionsState(() => {
            const temp = ["", "", "", "", "", "", "", ""];
            temp[currentRegion - 1] = "selected";
            return temp;
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate("/login");
        }
      });

    ws.current = new WebSocket("ws://api-gamein.dariahamrah.ir/websocket/region");

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
          toast.success("مرحله انتخاب زمین پایان یافت.");
          navigate("/");
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
