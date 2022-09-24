import React, { useEffect } from "react";
import {
  APIKEY_AIRTABLE,
  AUTHENTIATION_TABLE_URL,
} from "../../Constants/APIKeys";

function FinishSignUpRedirect() {
  useEffect(() => {
    // makeNewUser();
  }, []);
  const makeNewUser = () => {
    let data = {
      fields: {
        Name: localStorage.getItem("name"),
        Email: localStorage.getItem("email"),
        Password: localStorage.getItem("password"),
        "Payment date": "12/11/22",
      },
    };
    // setLoading(true);
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
        localStorage.removeItem("password");
        console.log(res);
        // setLoading(false);
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
      Processing please wait...
    </h2>
  );
}

export default FinishSignUpRedirect;
