import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function SignupModal({ setSignIn, toggle }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    // localStorage
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
        <Button color="primary">Sign Up</Button>
      </ModalFooter>
    </>
  );
}

export default SignupModal;
