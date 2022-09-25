import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIKEY_AIRTABLE, MAIN_DATA_TABLE_URL } from "../../Constants/APIKeys";
import LiComponent from "../LiComponent";
import ProductDetailsSkeleton from "../SkeletonLoading/ProductDetailsSkeleton";

function ProductDetailsPage() {
  const params = useParams();
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    retrieveSingleData();
  }, []);
  const retrieveSingleData = () => {
    setLoading(true);
    fetch(`${MAIN_DATA_TABLE_URL}Grid%20view/${params.id}`, {
      headers: { Authorization: APIKEY_AIRTABLE },
    })
      .then((res) => res.json())
      .then((res) => {
        setRecord(res);

        console.log(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center py-5"
        style={{ boxShadow: "5px 5px 15px 0px rgba(184,184,184,0.5)" }}
      >
        {loading ? (
          <ProductDetailsSkeleton />
        ) : (
          <>
            <div className="col-md-4">
              <img
                className="card-img-top border-bottom"
                src={
                  "https://upload.wikimedia.org/wikipedia/en/d/d2/Firm_logo.jpg"
                }
                height="320px"
                alt="Card image cap"
              />
            </div>
            <div className=" col-md-7">
              <h2 className="text mt-2">VC: {record?.fields.Names}</h2>
              <ul class="list-group mt-3 ">
                <li class="list-group-item">
                  <LiComponent title="Firm" value={record?.fields.Firm} />
                </li>
                <li class="list-group-item">
                  <LiComponent title="Title" value={record?.fields.Title} />
                </li>
                {record?.fields.URL && (
                  <li class="list-group-item">
                    <LiComponent title="URL" value={record?.fields.URL} />
                  </li>
                )}
                {record?.fields["LinkedIn Profile"] && (
                  <li class="list-group-item">
                    <LiComponent
                      title="LinkedIn"
                      value={record?.fields["LinkedIn Profile"]}
                    />
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
