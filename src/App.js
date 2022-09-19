import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/Pages/HomePage";
import ProductDetailsPage from "./components/Pages/ProductDetailsPage";
import NavBar from "./components/NavBar";
import { loadStripe } from "@stripe/stripe-js";

import SignupPage from "./components/Pages/SignupPage";

function App() {
  const stripe = loadStripe("{PUBLIC-KEY}");
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<ProductDetailsPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
