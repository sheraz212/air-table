import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./components/Pages/HomePage";
import ProductDetailsPage from "./components/Pages/ProductDetailsPage";
import NavBar from "./components/NavBar";
import FinishSignUpRedirect from "./components/Pages/FinishSignUpRedirect";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/details/:id/:isSignup"
            element={<ProductDetailsPage />}
          />
          <Route path="/details/:id" element={<ProductDetailsPage />} />
          <Route path="/sign-up/:prodID" element={<FinishSignUpRedirect />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
