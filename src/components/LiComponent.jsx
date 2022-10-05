import React from "react";

function LiComponent({ title, value }) {
  return (
    <div className="row px-3 ">
      <div className="text fs-6 col-sm-4">{title}</div>
      <div
        className="text fs-6 fw-bold col-sm-8"
        style={{ wordWrap: "break-word" }}
      >
        {value}
      </div>
    </div>
  );
}

export default LiComponent;
