import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import "./ComponentsCss/payment-component.css";

function PaymentComponent() {
  //   const [isPaymentLoading, setPaymentLoading] = useState(false);
  //   const stripe = useStripe();
  //   const elements = useElements();

  //   const getPayment = async () => {
  //     const paymentResult = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //         billing_details: {
  //           name: "Faruq Yusuff",
  //         },
  //       },
  //     });
  //   };

  //   const handleSubmit = () => async () => {
  //     console.log("yaha aya");
  //     const cardElement = elements.getElement(CardElement);
  //     console.log("yaha puhancha", cardElement);

  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: cardElement,
  //     });

  //     if (error) {
  //       console.log("ye cahla");
  //       console.log("[error]", error);
  //     } else {
  //       console.log("[PaymentMethod]", paymentMethod);
  //       console.log("ni ye chala");

  //       // ... POST: /api/charge/user
  //     }
  //   };
  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      {/* <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />
            <button
              className="pay-button"
              disabled={isPaymentLoading}
              onClick={handleSubmit}
            >
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
}

export default PaymentComponent;
