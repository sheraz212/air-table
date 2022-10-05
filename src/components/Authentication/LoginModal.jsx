import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  APIKEY_AIRTABLE,
  AUTHENTIATION_TABLE_URL,
} from "../../Constants/APIKeys";
import ActivityIndicator from "../animation";
import "./authentication.css";
import SignupModal from "./SignupModal";
function LoginModal({ model, setModal, toggle, selectedID }) {
  const [signIn, setSignIn] = useState(true);
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const enableSignup = () => {
    setSignIn(false);
  };
  const signInUser = async () => {
    setLoading(true);

    if (userID) {
      const response = await axios(`${AUTHENTIATION_TABLE_URL}/${userID}`, {
        headers: {
          Authorization: APIKEY_AIRTABLE,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response?.data) {
        setLoading(false);
        if (response?.data.id) {
          localStorage.setItem("id", response.data.id);
          localStorage.setItem(
            "paymentDate",
            response.data.fields["Payment Date"]
          );
          navigate(`/details/${selectedID}`);
        }
      } else alert("Something went wrong please try again on previous page");
    } else alert("please enter login Id");
  };

  const onChangeHandler = (e) => {
    setUserID(e.target.value);
  };
  return (
    <div>
      <Modal isOpen={model} toggle={toggle}>
        {signIn ? (
          <>
            <ModalHeader toggle={toggle}>Please login to continue</ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group  mb-2">
                  <label for="exampleInputEmail1">Login ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder=" Please enter your login ID "
                    value={userID}
                    onChange={onChangeHandler}
                  />
                </div>

                <p>
                  Create new account
                  <strong
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={enableSignup}
                  >
                    {" "}
                    Signup
                  </strong>
                </p>
              </form>
            </ModalBody>
            <ModalFooter>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Button color="primary" onClick={signInUser}>
                  Login
                </Button>
              )}
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
