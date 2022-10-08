import React, { useState } from "react";
import "./pagesCss/homepage.css";
import { useNavigate, useParams } from "react-router-dom";
import NewForm from "../NewForm";
import SkeletonLoadingProducts from "../SkeletonLoading/SkeletonLoadingProducts";
import LoginModal from "../Authentication/LoginModal";
import {
  APIKEY_AIRTABLE,
  AUTHENTIATION_TABLE_URL,
  MAIN_DATA_TABLE_URL,
} from "../../Constants/APIKeys";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";
import RenewMembership from "../RenewMembership";

function HomePage() {
  const [allData, setAllData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [paginationOffset, setPaginationOffset] = useState();
  const [endOfData, setEndOfData] = useState(false);
  const [model, setModal] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      updatePaymentDate();
    }
  }, []);
  const { data, status } = useQuery(
    "products",
    () =>
      axios.get(
        `${MAIN_DATA_TABLE_URL}?fields%5B%5D=Names&fields%5B%5D=Title&fields%5B%5D=Firm&pageSize=100`,
        { headers: { Authorization: APIKEY_AIRTABLE } }
      ),
    {
      keepPreviousData: true,
    }
  );

  const updatePaymentDate = async () => {
    let data = {
      fields: {
        "Payment Date": new Date(),
      },
    };
    const response = await axios.patch(
      `${AUTHENTIATION_TABLE_URL}/${params.id}`,

      JSON.stringify(data),
      {
        headers: {
          Authorization: APIKEY_AIRTABLE,
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.data?.id) {
      localStorage.setItem("id", response.data.id);
      localStorage.setItem(
        "emailAddress",
        response.data.fields["User Email Address"]
      );
      localStorage.setItem("firstName", response.data.fields["First Name"]);
      localStorage.setItem("lastName", response.data.fields["Last Name"]);
      localStorage.setItem("paymentDate", response.data.fields["Payment Date"]);
      alert("Congratulations your account has been updated!");
      navigate("/");
    } else alert("Something went wrong");
  };
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
        `${MAIN_DATA_TABLE_URL}?fields%5B%5D=Names&fields%5B%5D=Title&fields%5B%5D=Firm&pageSize=100&offset=${pagination}`,
        {
          headers: { Authorization: APIKEY_AIRTABLE },
        }
      );
      if (response?.data) {
        setPageLoading(false);
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
        <h1 className="text-center mb-5"> VC Background Database.</h1>
        {!params.id && <RenewMembership />}

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
              <div
                className="row justify-content-center"
                style={{ marginBottom: "30px" }}
              >
                {!endOfData ? (
                  <button
                    disabled={pageLoading}
                    onClick={paginationHandler}
                    className="col-lg-3 btn btn-primary "
                  >
                    <b>Load More</b>
                  </button>
                ) : (
                  <b className="text-center h4">End of data</b>
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
