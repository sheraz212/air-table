import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/Pages/HomePage";
import ProductDetailsPage from "./components/Pages/ProductDetailsPage";
import NavBar from "./components/NavBar";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51LjlLHEpJlZ6F4BF0w7tf03qtCzQbKneNCWlmLG6wKm8Bxf7viPCitwrO1Jzqm2UepULzAvsLNTCN1bF2fzEI3a100v2SCq58D"
  );

  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe
      .redirectToCheckout({
        lineItems: [
          {
            price: "price_1LlEIkEpJlZ6F4BFhNpSwC7A", // Replace with the ID of your price
            quantity: 1,
          },
        ],
        mode: "payment",
        // successUrl: "https://localhost:3000/details/rec03svbwmhpQgu0u",
        // cancelUrl: "https://localhost:3000",
      })
      .then(function (result) {
        console.log("hello", result);
      });
    console.log(error);
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };

  return (
    <Router>
      <NavBar />
      <button
        className="bg-primary m-4"
        style={{ width: "200px", height: "300px" }}
        onClick={handleClick}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
