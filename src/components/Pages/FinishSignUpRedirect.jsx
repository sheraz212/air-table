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
      console.log(response);
      const isTaken = response.data.records.find(
        (alreadyEmail) =>
          alreadyEmail?.fields["User Email Address"] ===
          localStorage.getItem("email")
      );
      if (isTaken) {
        alert("This email is already taken");
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
        localStorage.setItem("id", responseUser.data.id);
        localStorage.setItem(
          "paymentDate",
          responseUser.data.fields["Payment Date"]
        );
        localStorage.setItem(
          "firstName",
          responseUser.data?.fields["First Name"]
        );
        localStorage.setItem(
          "lastName",
          responseUser.data?.fields["Last name"]
        );
        navigate(`/details/${params.prodID}/true`, { replace: true });
      } else alert("Something went wrong please try again on previous page");
    }
  };
  return (
    <h2
      className="row justify-content-center align-items-center flex-grow-1"
      style={{ height: "70vh" }}
    >
      <ActivityIndicator />
    </h2>
  );
}

export default FinishSignUpRedirect;
