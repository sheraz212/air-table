import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  APIKEY_AIRTABLE,
  BASE_URL,
  CHECK_EMAIL_ADDRESS,
} from "../../Constants/APIKeys";

function SignupModal({ setSignIn, toggle, prodID }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    "pk_test_51LjlLHEpJlZ6F4BF0w7tf03qtCzQbKneNCWlmLG6wKm8Bxf7viPCitwrO1Jzqm2UepULzAvsLNTCN1bF2fzEI3a100v2SCq58D"
  );
  const handleSubmit = async () => {
    const response = await axios(CHECK_EMAIL_ADDRESS, {
      headers: { Authorization: APIKEY_AIRTABLE },
    });

    if (response?.data) {
      if (firstName && email && lastName) {
        const isTaken = response.data.records.find(
          (alreadyEmail) => alreadyEmail?.fields["User Email Address"] === email
        );
        if (isTaken) {
          alert("This email is already taken");
          return;
        }
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("productID", prodID);

        handlePayment();
      }
      return;
    } else alert("Please fill all require fields.");
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    name === "firstName"
      ? setFirstName(value)
      : name === "lastName"
      ? setLastName(value)
      : setEmail(value);
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe
      .redirectToCheckout({
        lineItems: [
          {
            price: "price_1LlEIkEpJlZ6F4BFhNpSwC7A",
            quantity: 1,
          },
        ],
        mode: "payment",
        // successUrl: `https://deluxe-ganache-d846d9.netlify.app/sign-up/${prodID}`,
        successUrl: `${BASE_URL}/sign-up/${prodID}`,
        cancelUrl: `${BASE_URL}`,
      })
      .then(function (result) {
        navigate(`/sign-up/${prodID}`);
      });
    console.log(error);
  };

  return (
    <>
      <ModalHeader toggle={toggle}>Please Sign Up to continue</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group mb-2">
            <label for="exampleInputEmail1">First Name</label>
            <input
              value={firstName}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              placeholder="Enter first name"
              name="firstName"
            />
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputEmail1">Last Name</label>
            <input
              value={lastName}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              placeholder="Enter last name"
              name="lastName"
            />
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputEmail1">Email address</label>
            <input
              value={email}
              onChange={onChangeHandler}
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <b className="small-notice">
            We are currently offering membership only in $75 for 3 months this
            page will redirect you to payment page
          </b>
          <p className="mt-2">
            Already have account?{" "}
            <strong
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setSignIn(true)}
            >
              Signin
            </strong>
          </p>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </ModalFooter>
    </>
  );
}

export default SignupModal;
