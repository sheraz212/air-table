import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./authentication.css";
function LoginModal({ model, setModal, toggle, selectedID }) {
  console.log(selectedID);
  return (
    <div>
      <Modal isOpen={model} toggle={toggle}>
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
              Create new account
              <Link>
                <strong>Signup </strong>
              </Link>
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Login</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginModal;
