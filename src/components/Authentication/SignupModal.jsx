import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function SignupModal({ setSignIn, toggle }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    "pk_test_51LjlLHEpJlZ6F4BF0w7tf03qtCzQbKneNCWlmLG6wKm8Bxf7viPCitwrO1Jzqm2UepULzAvsLNTCN1bF2fzEI3a100v2SCq58D"
  );
  const handleSubmit = () => {
    if (name && email && password) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/sign-up");
      return;
    } else alert("Please fill all require fields.");
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    name === "name"
      ? setName(value)
      : name === "password"
      ? setPassword(value)
      : setEmail(value);
    console.log(name, value);
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
        successUrl: "https://localhost:3000/details/rec03svbwmhpQgu0u",
        cancelUrl: "https://localhost:3000",
      })
      .then(function (result) {
        console.log("hello", result);
      });
    console.log(error);
  };

  return (
    <>
      <ModalHeader toggle={toggle}>Please Sign Up to continue</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group  mb-2">
            <label for="exampleInputEmail1">Name</label>
            <input
              value={name}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter name"
              name="name"
            />
          </div>
          <div className="form-group  mb-2">
            <label for="exampleInputEmail1">Email address</label>
            <input
              value={email}
              onChange={onChangeHandler}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group  mb-2">
            <label for="exampleInputPassword1">Password</label>
            <input
              value={password}
              onChange={onChangeHandler}
              type="password"
              className="form-control"
              placeholder="*****"
              name="password"
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
