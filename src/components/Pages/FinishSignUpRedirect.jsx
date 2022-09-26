import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  APIKEY_AIRTABLE,
  AUTHENTIATION_TABLE_URL,
} from "../../Constants/APIKeys";
import ActivityIndicator from "../animation";

function FinishSignUpRedirect() {
  const [id, setId] = useState();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (count === 0) {
      makeNewUser();
    }
  }, []);

  const makeNewUser = () => {
    let data = {
      fields: {
        Name: localStorage.getItem("name"),
        Email: localStorage.getItem("email"),
        "Payment date": "12/11/22",
      },
    };
    fetch(AUTHENTIATION_TABLE_URL, {
      method: "POST",
      headers: {
        Authorization: APIKEY_AIRTABLE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("id", res.id);
        setId(res.id);
        localStorage.removeItem("password");
        setCount(1);

        navigate(`/details/${params.prodID}/true`, { replace: true });
      })
      .catch((error) =>
        alert("Something went wrong please try again on previous page")
      );
  };
  return (
    <h2
      className="row justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <ActivityIndicator />
    </h2>
  );
}

export default FinishSignUpRedirect;
