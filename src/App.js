import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import NewForm from "./components/NewForm";
import NavBar from "./components/NavBar";
import GetDimensions from "./components/CustomHooks/GetDImensions";
import SkeletonLoadingProducts from "./components/SkeletonLoadingProducts";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getTable();
    getTableTwo();
  }, []);

  const getTable = () => {
    setLoading(true);
    fetch(
      "https://api.airtable.com/v0/app2eNQJ81li2YSvR/Table%201?api_key=keyzdwwm63fQxCJIq"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.records);
        // console.log(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const getTableTwo = () => {
    setLoading(true);
    fetch(
      "https://api.airtable.com/v0/appbhM53vmNeHjL9t/Grid%20view?api_key=keyzdwwm63fQxCJIq"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.records);

        console.log(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h1 className="text-center mb-5">Welcome to Herlem Labs </h1>
        <div className="row">
          {loading ? (
            <SkeletonLoadingProducts />
          ) : (
            <div className="row" style={{ marginBottom: "30px" }}>
              {data?.map((singleData) => (
                <div
                  className="col-6 col-sm-4 col-md-3 mb-4"
                  key={singleData.id}
                >
                  <div className="card h-100 " style={{ cursor: "pointer" }}>
                    <img
                      className="card-img-top border-bottom"
                      src={
                        singleData
                          ? "https://upload.wikimedia.org/wikipedia/en/d/d2/Firm_logo.jpg"
                          : "https://via.placeholder.com/362x200"
                      }
                      height="230px"
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{singleData.fields.Names}</h5>
                      <p className="card-text">{singleData.fields.Title}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {singleData.fields.Firm}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="col-md-4">
            <NewForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
