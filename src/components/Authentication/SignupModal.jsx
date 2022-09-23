import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function SignupModal({ setSignIn, toggle }) {
  const handleSubmit = (token) => {
    console.log(token);
  };
  return (
    <>
      <ModalHeader toggle={toggle}>Please login to continue</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group  mb-2">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter "
            />
          </div>
          <div className="form-group  mb-2">
            <label for="exampleInputPassword1">Password</label>
            <input type="text" className="form-control" placeholder="*****" />
          </div>
          <p>
            Already have account{" "}
            <strong
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setSignIn(true)}
            >
              Signin{" "}
            </strong>
          </p>
        </form>
      </ModalBody>
      <ModalFooter>{/* <Button color="primary">Login</Button> */}</ModalFooter>
    </>
  );
}

export default SignupModal;
