import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  APIKEY_AIRTABLE,
  AUTHENTIATION_TABLE_URL,
  CHECK_EMAIL_ADDRESS,
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

  const makeNewUser = async () => {
    let data = {
      fields: {
        "User Email Address": localStorage.getItem("email"),
        "First Name": localStorage.getItem("firstName"),
        "Last name": localStorage.getItem("lastName"),
        "Payment Date": new Date(),
      },
    };
    const response = await axios(CHECK_EMAIL_ADDRESS, {
      headers: { Authorization: APIKEY_AIRTABLE },
    });

    if (response?.data) {
      const isTaken = response.data.records.find(
        (alreadyEmail) =>
          alreadyEmail?.fields["User Email Address"] ===
          localStorage.getItem("email")
      );
      if (isTaken) {
        return;
      }
      const responseUser = await axios.post(
        AUTHENTIATION_TABLE_URL,
        JSON.stringify(data),
        {
          headers: {
            Authorization: APIKEY_AIRTABLE,
            "Content-Type": "application/json",
          },
        }
      );
      if (responseUser?.data?.id) {
        console.log({ responseUser });
        localStorage.setItem("id", responseUser.data.id);
        localStorage.setItem("paymentDate", responseUser.data["Payment Date"]);
        setId(responseUser.data.id);
        navigate(`/details/${params.prodID}/true`, { replace: true });
      } else alert("Something went wrong please try again on previous page");
    }
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
