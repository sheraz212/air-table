import React from "react";

function LiComponent({ title, value }) {
  return (
    <div className="row px-3">
      <div className="fs-6 col-sm-4">{title}</div>
      <div className="fs-6 fw-bold col-sm-8">{value}</div>
    </div>
  );
}

export default LiComponent;
