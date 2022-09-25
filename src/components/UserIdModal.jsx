import React from "react";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function UserIdModal({ modal, toggle }) {
  const [allowClose, setAllowClose] = useState(false);
  const onChangeHandler = () => {
    setAllowClose(true);
  };
  return (
    <Modal isOpen={modal}>
      <ModalHeader>Congrats for signing up!</ModalHeader>
      <ModalBody>
        <h5>
          {" "}
          This is the your id please save it securely you would need this to
          login to your account{" "}
          <b style={{ fontSize: "22px" }}>{localStorage.getItem("id")}</b>
        </h5>
        <FormGroup check>
          <Label check>
            <Input onChange={onChangeHandler} type="radio" name="radio1" /> I've
            copied my login id to secured place.
          </Label>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button disabled={!allowClose} color="primary" onClick={toggle}>
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default UserIdModal;
