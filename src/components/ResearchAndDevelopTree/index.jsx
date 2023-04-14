import React, { useLayoutEffect, useState } from "react";
import Arrow from "./Arrow";
import LockIcon from "./icons/LockIcon";
import TouchScreenIcon from "./icons/TouchScreenIcon";
import FoldableScreenIcon from "./icons/FoldableScreenIcon";
import AdvancedDisplayIcon from "./icons/AdvancedDisplayIcon";
import ThreeGIcon from "./icons/ThreeGIcon";
import FourGIcon from "./icons/FourGIcon";
import FiveGIcon from "./icons/FiveGIcon";
import BasicSoCIcon from "./icons/BasicSoCIcon";
import QuantumComputationIcon from "./icons/QuantumComputationIcon";
import CameraIcon from "./icons/CameraIcon";
import MultiCameraIcon from "./icons/MultiCameraIcon";
import Assembly1Icon from "./icons/Assembly1Icon";
import Assembly2Icon from "./icons/Assembly2Icon";
import Assembly3Icon from "./icons/Assembly3Icon";
import Assembly4Icon from "./icons/Assembly4Icon";
import OkIcon from "./icons/OkIcon";
import ClockIcon from "./icons/ClockIcon";
import { Tooltip } from "@mui/material";
import { useRecoilState } from "recoil";
import { dataState } from "../../store/research-and-develop";

import styles from "./styles.module.scss";

const ResearchAndDevelopTree = ({ year, technologies }) => {
  const [data, setData] = useRecoilState(dataState);
  const [_, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function eventHandle() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", eventHandle);
    return () => window.removeEventListener("resize", eventHandle);
  }, []);

  const [body1, setBody1] = useState(null);
  const [body2, setBody2] = useState(null);
  const [body3, setBody3] = useState(null);

  const [comms1, setComms1] = useState(null);
  const [comms2, setComms2] = useState(null);
  const [comms3, setComms3] = useState(null);

  const [memory1, setMemory1] = useState(null);
  const [memory2, setMemory2] = useState(null);

  const [media1, setMedia1] = useState(null);
  const [media2, setMedia2] = useState(null);

  const [assembly1, setAssembly1] = useState(null);
  const [assembly2, setAssembly2] = useState(null);
  const [assembly3, setAssembly3] = useState(null);
  const [assembly4, setAssembly4] = useState(null);

  return (
    <div className={styles["container"]} style={{ direction: "ltr" }}>
      <Arrow from={body1} to={body2} />
      <Arrow from={body2} to={body3} />

      <Arrow from={comms1} to={comms2} />
      <Arrow from={comms2} to={comms3} />

      <Arrow from={memory1} to={memory2} />

      <Arrow from={media1} to={media2} />

      <Arrow from={assembly1} to={assembly2} />
      <Arrow from={assembly2} to={assembly3} />
      <Arrow from={assembly3} to={assembly4} />

      <div className={styles["chart-container"]}>
        <div className={styles["column"]}>
          <div></div>
          <div className={styles["year-item"]}>2008 - 2010</div>
          <div className={styles["year-item"]}>2011 - 2015</div>
          <div className={styles["year-item"]}>2016 - 2022</div>
          <div className={styles["year-item"]}>2023 - 2030</div>
        </div>
        <div className={styles["column"]}>
          <div>Body</div>
          <Tooltip
            title="Touch Screen"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "touch-screen", title: "Touch Screen" });
            }}
          >
            <div
              className={
                (data?.value === "touch-screen"
                  ? styles["selected"] + " "
                  : "") +
                (year < 2008
                  ? ""
                  : technologies["touch-screen"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setBody1}
            >
              {year < 2008 ? <LockIcon /> : <TouchScreenIcon />}
              {year >= 2008 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["touch-screen"] === "done"
                        ? "#009054"
                        : technologies["touch-screen"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {year >= 2008 &&
                    (technologies["touch-screen"] === "done" ? (
                      <OkIcon />
                    ) : technologies["touch-screen"] === "doing" ? (
                      <ClockIcon />
                    ) : (
                      <LockIcon />
                    ))}
                </div>
              )}
            </div>
          </Tooltip>

          <div className={styles["spacer"]}></div>

          <Tooltip
            title="Foldable Screen"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "foldable-screen", title: "Foldable Screen" });
            }}
          >
            <div
              className={
                (data?.value === "foldable-screen"
                  ? styles["selected"] + " "
                  : "") +
                (year < 2016
                  ? ""
                  : technologies["foldable-screen"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setBody2}
            >
              {year < 2016 ? <LockIcon /> : <FoldableScreenIcon />}
              {year >= 2016 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["foldable-screen"] === "done"
                        ? "#009054"
                        : technologies["foldable-screen"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["foldable-screen"] === "done" ? (
                    <OkIcon />
                  ) : technologies["foldable-screen"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <Tooltip
            title="Advanced Display"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "advanced-display", title: "Advanced Display" });
            }}
          >
            <div
              className={
                (data?.value === "advanced-display"
                  ? styles["selected"] + " "
                  : "") +
                (year < 2023
                  ? ""
                  : technologies["advanced-display"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setBody3}
            >
              {year < 2023 ? <LockIcon /> : <AdvancedDisplayIcon />}
              {year >= 2023 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["advanced-display"] === "done"
                        ? "#009054"
                        : technologies["advanced-display"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["advanced-display"] === "done" ? (
                    <OkIcon />
                  ) : technologies["advanced-display"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>
        </div>
        <div className={styles["column"]}>
          <div>Network</div>
          <Tooltip
            title="3G"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "3G", title: "3G" });
            }}
          >
            <div
              className={
                (data?.value === "3G" ? styles["selected"] + " " : "") +
                (year < 2008
                  ? ""
                  : technologies["3G"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setComms1}
            >
              {year < 2008 ? <LockIcon /> : <ThreeGIcon />}
              {year >= 2008 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["3G"] === "done"
                        ? "#009054"
                        : technologies["3G"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["3G"] === "done" ? (
                    <OkIcon />
                  ) : technologies["3G"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <Tooltip
            title="4G"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "4G", title: "4G" });
            }}
          >
            <div
              className={
                (data?.value === "4G" ? styles["selected"] + " " : "") +
                (year < 2011
                  ? ""
                  : technologies["4G"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setComms2}
            >
              {year < 2011 ? <LockIcon /> : <FourGIcon />}
              {year >= 2011 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["4G"] === "done"
                        ? "#009054"
                        : technologies["4G"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["4G"] === "done" ? (
                    <OkIcon />
                  ) : technologies["4G"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <Tooltip
            title="5G"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "5G", title: "5G" });
            }}
          >
            <div
              className={
                (data?.value === "5G" ? styles["selected"] + " " : "") +
                (year < 2016
                  ? ""
                  : technologies["5G"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setComms3}
            >
              {year < 2016 ? <LockIcon /> : <FiveGIcon />}
              {year >= 2016 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["5G"] === "done"
                        ? "#009054"
                        : technologies["5G"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["5G"] === "done" ? (
                    <OkIcon />
                  ) : technologies["5G"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <div className={styles["spacer"]}></div>
        </div>
        <div className={styles["column"]}>
          <div className={styles["column-title"]}>SoC & Memory</div>
          <div className={styles["spacer"]}></div>

          <Tooltip
            title="Basic SoC & Memory"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({
                value: "basic-soc-memory",
                title: "Basic SoC & Memory",
              });
            }}
          >
            <div
              className={
                (data?.value === "basic-soc-memory"
                  ? styles["selected"] + " "
                  : "") +
                (year < 2011
                  ? ""
                  : technologies["basic-soc-memory"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setMemory1}
            >
              {year < 2011 ? <LockIcon /> : <BasicSoCIcon />}
              {year >= 2011 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["basic-soc-memory"] === "done"
                        ? "#009054"
                        : technologies["basic-soc-memory"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["basic-soc-memory"] === "done" ? (
                    <OkIcon />
                  ) : technologies["basic-soc-memory"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <div className={styles["spacer"]}></div>

          <Tooltip
            title="Quantum Computation"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({
                value: "quantum-computation",
                title: "Quantum Computing",
              });
            }}
          >
            <div
              className={
                (data?.value === "quantum-computation"
                  ? styles["selected"] + " "
                  : "") +
                (year < 2023
                  ? ""
                  : technologies["quantum-computation"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setMemory2}
            >
              {year < 2023 ? <LockIcon /> : <QuantumComputationIcon />}
              {year >= 2023 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["quantum-computation"] === "done"
                        ? "#009054"
                        : technologies["quantum-computation"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["quantum-computation"] === "done" ? (
                    <OkIcon />
                  ) : technologies["quantum-computation"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>
        </div>
        <div className={styles["column"]}>
          <div>Media</div>

          <Tooltip
            title="Camera"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "camera", title: "Camera" });
            }}
          >
            <div
              className={
                (data?.value === "camera" ? styles["selected"] + " " : "") +
                (year < 2008
                  ? ""
                  : technologies["camera"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setMedia1}
            >
              {year < 2008 ? <LockIcon /> : <CameraIcon />}
              {year >= 2008 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["camera"] === "done"
                        ? "#009054"
                        : technologies["camera"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["camera"] === "done" ? (
                    <OkIcon />
                  ) : technologies["camera"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <div className={styles["spacer"]}></div>

          <Tooltip
            title="Multi Camera"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "multi-camera", title: "Multi Camera" });
            }}
          >
            <div
              className={
                (data?.value === "multi-camera"
                  ? styles["selected"] + " "
                  : "") +
                (year < 2016
                  ? ""
                  : technologies["multi-camera"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setMedia2}
            >
              {year < 2016 ? <LockIcon /> : <MultiCameraIcon />}
              {year >= 2016 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["multi-camera"] === "done"
                        ? "#009054"
                        : technologies["multi-camera"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["multi-camera"] === "done" ? (
                    <OkIcon />
                  ) : technologies["multi-camera"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>
          <div className={styles["spacer"]}></div>
        </div>
        <div className={styles["column"]}>
          <span className={styles["divider"]}></span>
        </div>
        <div className={styles["column"]}>
          <div>Assembly</div>

          <Tooltip
            title="Era 2 Assembly"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "assembly-1", title: "Era 2 Assembly" });
            }}
          >
            <div
              className={
                (data?.value === "assembly-1" ? styles["selected"] + " " : "") +
                (year < 2008
                  ? ""
                  : technologies["assembly-1"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setAssembly1}
            >
              {year < 2008 ? <LockIcon /> : <Assembly1Icon />}
              {year >= 2008 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["assembly-1"] === "done"
                        ? "#009054"
                        : technologies["assembly-1"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["assembly-1"] === "done" ? (
                    <OkIcon />
                  ) : technologies["assembly-1"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <Tooltip
            title="Era 3 Assembly"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "assembly-2", title: "Era 3 Assembly" });
            }}
          >
            <div
              className={
                (data?.value === "assembly-2" ? styles["selected"] + " " : "") +
                (year < 2011
                  ? ""
                  : technologies["assembly-2"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setAssembly2}
            >
              {year < 2011 ? <LockIcon /> : <Assembly2Icon />}
              {year >= 2011 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["assembly-2"] === "done"
                        ? "#009054"
                        : technologies["assembly-2"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["assembly-2"] === "done" ? (
                    <OkIcon />
                  ) : technologies["assembly-2"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <Tooltip
            title="Era 4 Assembly"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "assembly-3", title: "Era 4 Assembly" });
            }}
          >
            <div
              className={
                (data?.value === "assembly-3" ? styles["selected"] + " " : "") +
                (year < 2016
                  ? ""
                  : technologies["assembly-3"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setAssembly3}
            >
              {year < 2016 ? <LockIcon /> : <Assembly3Icon />}
              {year >= 2016 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["assembly-3"] === "done"
                        ? "#009054"
                        : technologies["assembly-3"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["assembly-3"] === "done" ? (
                    <OkIcon />
                  ) : technologies["assembly-3"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>

          <Tooltip
            title="Era 5 Assembly"
            arrow
            style={{ cursor: "pointer" }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#7e95e0",
                  top: -8,

                  "& .MuiTooltip-arrow": {
                    color: "#7e95e0",
                  },
                },
              },
            }}
            onClick={() => {
              setData({ value: "assembly-4", title: "Era 5 Assembly" });
            }}
          >
            <div
              className={
                (data?.value === "assembly-4" ? styles["selected"] + " " : "") +
                (year < 2023
                  ? ""
                  : technologies["assembly-4"] === "done"
                  ? styles["unlocked"]
                  : styles["unlockable"])
              }
              ref={setAssembly4}
            >
              {year < 2023 ? <LockIcon /> : <Assembly4Icon />}
              {year >= 2023 && (
                <div
                  className={styles["absolute-icon"]}
                  style={{
                    backgroundColor:
                      technologies["assembly-4"] === "done"
                        ? "#009054"
                        : technologies["assembly-4"] === "doing"
                        ? "#ffd73b"
                        : "#8d8d8d",
                  }}
                >
                  {technologies["assembly-4"] === "done" ? (
                    <OkIcon />
                  ) : technologies["assembly-4"] === "doing" ? (
                    <ClockIcon />
                  ) : (
                    <LockIcon />
                  )}
                </div>
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ResearchAndDevelopTree;
