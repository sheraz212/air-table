import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { BASE_URL, PRODUCT_PRICE_KEY, STRIPE_KEY } from "../Constants/APIKeys";
import ActivityIndicator from "./animation";

function RenewMembership() {
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(STRIPE_KEY);

  const navigate = useNavigate();
  let date =
    localStorage.getItem("paymentDate") &&
    new Date(localStorage.getItem("paymentDate"));
  let displayExpiry = new Date(localStorage.getItem("paymentDate"));
  displayExpiry.setMonth(displayExpiry.getMonth() + 3);

  useEffect(() => {
    if (date) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 3);
      console.log({ currentDate, date });

      if (+currentDate > +date) {
        setModel(true);
      }
    }
  }, []);

  const logOutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe
      .redirectToCheckout({
        lineItems: [
          {
            price: PRODUCT_PRICE_KEY,
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `${BASE_URL}/renew-membership/${localStorage.getItem(
          "id"
        )}`,
        cancelUrl: `${BASE_URL}`,
      })
      .then(function (result) {
        navigate(`/renew-membership/${localStorage.getItem("id")}`);
      });
    console.log(error);
  };

  return (
    <div>
      <Modal isOpen={model}>
        <ModalHeader>Your Membership is expired</ModalHeader>
        <ModalBody>
          Your Membership was expired on{" "}
          <b>
            {displayExpiry &&
              `${displayExpiry.getDate()}/${
                displayExpiry.getMonth() + 1
              }/${displayExpiry.getFullYear()}`}
          </b>{" "}
          please renew it to continue..
        </ModalBody>
        <ModalFooter>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Button color="primary" onClick={handlePayment}>
                Renew Membership
              </Button>
              <Button color="danger" onClick={logOutUser}>
                Logout
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RenewMembership;
