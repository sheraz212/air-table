import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/Pages/HomePage";
import ProductDetailsPage from "./components/Pages/ProductDetailsPage";
import NavBar from "./components/NavBar";
import FinishSignUpRedirect from "./components/Pages/FinishSignUpRedirect";

function App() {
  return (
    <Router>
      <NavBar />
      {/* <button
        className="bg-primary m-4"
        style={{ width: "200px", height: "300px" }}
        onClick={handleClick}
      /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<ProductDetailsPage />} />
        <Route path="/sign-up/:prodID" element={<FinishSignUpRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
