import React from "react";
import Skeleton from "react-loading-skeleton";

function ProductDetailsSkeleton() {
  return (
    <>
      <div className="col-md-4">
        <Skeleton height="310px" />
      </div>
      <div className=" col-md-7">
        <Skeleton height="50px" className="mb-4" />

        <ul className="list-group mt-3 ">
          <li className="list-group-item">
            <Skeleton height="30px" />
          </li>
          <li className="list-group-item">
            <Skeleton height="30px" />
          </li>
          <li className="list-group-item">
            <Skeleton height="30px" />
          </li>
          <li className="list-group-item">
            <Skeleton height="30px" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProductDetailsSkeleton;
