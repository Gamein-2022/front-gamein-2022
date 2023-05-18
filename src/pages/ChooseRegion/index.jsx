import React, { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getInitialRegion } from "../../apis/region";
import { formatPrice } from "../../utils/formatters";
import Region from "./components/Region";
import RegionsMap from "./components/RegionsMap";
import "./style.scss";
import MyCountDown from "../../components/CountDown/MyCountDown";
import GameinLoading from "../../components/GameinLoading";

const REGIONS = [
  {
    title: "منطقه یک",
    resources: "Cobalt, Microphone, Glass, Vibration Motor",
  },
  {
    title: "منطقه دو",
    resources: "Aluminum, Lithium, Speaker, Processors",
  },
  {
    title: "منطقه سه",
    resources: "Silicon, Copper",
  },
  {
    title: "منطقه چهار",
    resources: "Silicon, Aluminum, Copper, Ports",
  },
  {
    title: "منطقه پنج",
    resources: "Lithium, Plastic, Processors",
  },
  {
    title: "منطقه شش",
    resources: "Ports, Microphone, Cobalt",
  },
  {
    title: "منطقه هفت",
    resources: "Vibration Motor, Chips, Cobalt",
  },
  {
    title: "منطقه هشت",
    resources: "Plastic, Speaker, Cobalt, Ports",
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
  const [balance, setBalance] = useState(0);
  const [populations, setPopulations] = useState([]);
  const selectedRegion = regionsState.findIndex((item) => item === "selected");
  const [initialRemainedTimeState, setInitialRemainedTimeState] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getInitialRegion()
      .then((res) => res.data)
      .then((data) => {
        const currentRegion = +data.teamRegionId;
        if (data?.remainingTime <= 0) {
          navigate("/");
        }
        setBalance(data?.teamBalance || 0);
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
      })
      .finally(() => {
        setPageLoading(false);
      });

    ws.current = new WebSocket(
      "wss://api-gamein2022.dariahamrah.ir/websocket/region"
    );

    ws.current.onopen = function (event) {
      ws.current?.send(
        JSON.stringify({
          event: "SET_TEAM_ID",
          token: "Bearer " + localStorage.getItem("token"),
        })
      );
    };

    ws.current.onmessage = function (event) {
      const data = JSON.parse(event.data);
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

  const handleCountDownComplete = () => {
    if (initialRemainedTimeState) {
      toast.success("مرحله انتخاب زمین پایان یافت.");
      navigate("/");
    }
  };

  const handleCountDownTick = () => {
    if (initialRemainedTimeState) {
      setInitialRemainedTimeState(initialRemainedTimeState - 1);
    }
  };

  return (
    <>
      {pageLoading && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GameinLoading size={32} />
        </div>
      )}
      {!pageLoading && (
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
                اولین قدم در شروع این بازی، انتخاب منطقه‌ایه که می‌خواید
                کارخونه‌ی خودتون رو توش بسازین. هر کدوم از این منطقه‌ها، مشخصاتی
                دارن که تو روند بازی موثره پس تو انتخابتون دقت کنین و با
                استراتژی تصمیم بگیرین :)
              </p>

              <div className="choose-region__time">
                <div className="choose-region__balance-title">
                  دارایی پس از خرید زمین
                </div>
                <div className="choose-region__balance-value">
                  {formatPrice(balance - (prices[selectedRegion] || 0))}
                </div>
                <div
                  key={initialRemainedTimeState}
                  className="choose-region__time-value"
                >
                  <MyCountDown
                    timeInSeconds={initialRemainedTimeState}
                    onComplete={handleCountDownComplete}
                    onTick={handleCountDownTick}
                  />
                </div>
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
      )}
    </>
  );
}

export default ChooseRegion;
