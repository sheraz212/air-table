import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonLoadingProducts() {
  const skeletons = Array.from(Array(10).keys());
  console.log(skeletons);
  return (
    <div className="row">
      {skeletons.map((item) => (
        <div className="col-6 col-sm-4 col-md-3 mb-4">
          <Skeleton height="200px" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoadingProducts;
