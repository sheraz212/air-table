import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./loader.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const ActivityIndicator = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie options={defaultOptions} height={120} width={120} />
    </div>
  );
};

export default ActivityIndicator;
