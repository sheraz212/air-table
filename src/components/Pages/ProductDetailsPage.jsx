import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LiComponent from "../LiComponent";

function ProductDetailsPage() {
  const params = useParams();
  const [record, setRecord] = useState();
  console.log({ params });
  useEffect(() => {
    retrieveSingleData();
  }, []);

  const retrieveSingleData = () => {
    // setLoading(true);
    fetch(
      `https://api.airtable.com/v0/appbhM53vmNeHjL9t/Grid%20view/${params.id}`,
      { headers: { Authorization: `Bearer keyzdwwm63fQxCJIq` } }
    )
      .then((res) => res.json())
      .then((res) => {
        setRecord(res);

        console.log(res);
        // setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center py-5"
        style={{ boxShadow: "5px 5px 15px 0px rgba(184,184,184,0.5)" }}
      >
        <div className="col-md-4">
          <img
            className="card-img-top border-bottom"
            src={"https://upload.wikimedia.org/wikipedia/en/d/d2/Firm_logo.jpg"}
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
      </div>
    </div>
  );
}

export default ProductDetailsPage;
