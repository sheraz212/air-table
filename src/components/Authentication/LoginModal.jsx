import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./authentication.css";
import SignupModal from "./SignupModal";
function LoginModal({ model, setModal, toggle, selectedID }) {
  console.log(selectedID);
  const [signIn, setSignIn] = useState(true);
  const enableSignup = () => {
    setSignIn(false);
  };
  console.log(signIn);
  return (
    <div>
      <Modal isOpen={model} toggle={toggle}>
        {signIn ? (
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="*****"
                  />
                </div>
                <p>
                  Create new account
                  <strong
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={enableSignup}
                  >
                    Signup
                  </strong>
                </p>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Login</Button>
            </ModalFooter>
          </>
        ) : (
          <SignupModal
            setSignIn={setSignIn}
            toggle={toggle}
            prodID={selectedID}
          />
        )}
      </Modal>
    </div>
  );
}

export default LoginModal;
