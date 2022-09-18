import React, { useEffect, useState } from "react";
import "./pagesCss/homepage.css";

import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import NewForm from "../NewForm";
import SkeletonLoadingProducts from "../SkeletonLoading/SkeletonLoadingProducts";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = () => {
    setLoading(true);
    fetch(
      "https://api.airtable.com/v0/appbhM53vmNeHjL9t/tblrKRG2iRMWWNAYY?fields%5B%5D=Names&fields%5B%5D=Title&fields%5B%5D=Firm&pageSize=50",
      { headers: { Authorization: `Bearer keyzdwwm63fQxCJIq` } }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.records);

        console.log(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Welcome to Herlem Labs </h1>
        <div className="row">
          {loading ? (
            <SkeletonLoadingProducts />
          ) : (
            <div className="row" style={{ marginBottom: "30px" }}>
              {data?.map((singleData) => (
                <div
                  className="col-6 col-sm-4 col-md-3 mb-4"
                  key={singleData.id}
                >
                  <Link
                    to={`/details/${singleData.id}`}
                    className="card h-100"
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <img
                      className="card-img-top border-bottom"
                      src={
                        singleData
                          ? "https://upload.wikimedia.org/wikipedia/en/d/d2/Firm_logo.jpg"
                          : "https://via.placeholder.com/362x200"
                      }
                      height="230px"
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{singleData.fields.Names}</h5>
                      <p className="card-text">{singleData.fields.Title}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {singleData.fields.Firm}
                        </small>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <NewForm />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
