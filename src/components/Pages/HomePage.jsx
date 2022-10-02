import React, { useEffect, useState } from "react";
import "./pagesCss/homepage.css";

import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import NewForm from "../NewForm";
import SkeletonLoadingProducts from "../SkeletonLoading/SkeletonLoadingProducts";
import LoginModal from "../Authentication/LoginModal";
import { APIKEY_AIRTABLE, MAIN_DATA_TABLE_URL } from "../../Constants/APIKeys";
import { useQuery } from "react-query";
import axios from "axios";
import ActivityIndicator from "../animation";

function HomePage() {
  const [allData, setAllData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [paginationOffset, setPaginationOffset] = useState();
  const [endOfData, setEndOfData] = useState(false);
  const [model, setModal] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const navigate = useNavigate();
  // console.log({ allData: allData?.length, paginationOffset, endOfData });
  const { data, status } = useQuery("bloodtests", () =>
    axios.get(
      `${MAIN_DATA_TABLE_URL}?fields%5B%5D=Names&fields%5B%5D=Title&fields%5B%5D=Firm&pageSize=48`,
      { headers: { Authorization: APIKEY_AIRTABLE } }
    )
  );

  const toggle = (id) => {
    setSelectedID(id);
    if (localStorage.getItem("id")) {
      navigate(`/details/${id}`);
      return;
    }
    setModal(!model);
  };

  const paginationHandler = async () => {
    if (!endOfData) {
      let pagination = paginationOffset ? paginationOffset : data.data.offset;
      setPageLoading(true);
      const response = await axios.get(
        `${MAIN_DATA_TABLE_URL}?fields%5B%5D=Names&fields%5B%5D=Title&fields%5B%5D=Firm&pageSize=48&offset=${pagination}`,
        {
          headers: { Authorization: APIKEY_AIRTABLE },
        }
      );
      console.log(response, "hellooo");
      if (response?.data) {
        setPageLoading(false);
        console.log(response.data.offset);
        if (!paginationOffset) {
          setAllData([...data.data.records, ...response?.data.records]);
        } else setAllData([...allData, ...response?.data.records]);
        if (response?.data.offset) {
          setPaginationOffset(response.data.offset);
        } else setEndOfData(true);
      } else setPageLoading(false);
    }
  };

  const mapData = (singleData) => (
    <div className="col-6 col-sm-4 col-md-3 mb-4" key={singleData.id}>
      <div
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
            <small className="text-muted">{singleData.fields.Firm}</small>
          </p>
        </div>
      </div>
    </div>
  );
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
          {status === "loading" ? (
            <SkeletonLoadingProducts />
          ) : (
            <>
              <div className="row">
                {allData?.length > 0
                  ? allData.map((singleData) => mapData(singleData))
                  : data?.data?.records.map((singleData) =>
                      mapData(singleData)
                    )}
              </div>
              <div className="row" style={{ marginBottom: "30px" }}>
                {!endOfData ? (
                  <button
                    disabled={pageLoading}
                    onClick={paginationHandler}
                    className="col-lg-12 btn btn-primary "
                  >
                    <b>Load More</b>
                  </button>
                ) : (
                  <b>End of data</b>
                )}
              </div>
            </>
          )}

          <NewForm />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
