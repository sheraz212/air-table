import React, { useEffect, useState } from "react";
import "./pagesCss/homepage.css";

import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import NewForm from "../NewForm";
import SkeletonLoadingProducts from "../SkeletonLoading/SkeletonLoadingProducts";
import LoginModal from "../Authentication/LoginModal";
import { APIKEY_AIRTABLE, MAIN_DATA_TABLE_URL } from "../../Constants/APIKeys";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModal] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = () => {
    setLoading(true);
    fetch(
      `${MAIN_DATA_TABLE_URL}tblrKRG2iRMWWNAYY?fields%5B%5D=Names&fields%5B%5D=Title&fields%5B%5D=Firm&pageSize=50`,
      { headers: { Authorization: APIKEY_AIRTABLE } }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.records);

        console.log(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const toggle = (id) => {
    setSelectedID(id);
    if (localStorage.getItem("id")) {
      navigate(`/details/${id}`);
      return;
    }
    setModal(!model);
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Welcome to Herlem Labs </h1>

        <LoginModal
          model={model}
          setModal={setModal}
          toggle={toggle}
          selectedID={selectedID}
        />
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
                  <div
                    // to={`/details/${singleData.id}`}
                    onClick={() => toggle(singleData.id)}
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
                  </div>
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
