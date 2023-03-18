import React, { useEffect, useRef, useState } from "react";
import { getInitialRegion } from "../../apis/region";
import "./style.scss";

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
      .then((data) => {
        console.log("data", data);
        const currentRegion = +data.currentRegion;
        setInitialRemainedTimeState(+data.remainingTime);
        if (currentRegion > 0) {
          setRegionsState(() => {
            const temp = ["", "", "", "", "", "", "", ""];
            temp[currentRegion - 1] = "selected";
            return temp;
          });
        }
      })
      .catch((error) => {})
      .catch((error) => {})
      .finally(() => {});

    ws.current = new WebSocket("wss://192.168.24.12:8080");

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
          token: localStorage.getItem("@token"),
          regionId: region + 1,
        })
      );
    }
  };
  return <div>ChooseRegion</div>;
}

export default ChooseRegion;
