import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import NewForm from "./components/NewForm";
import NavBar from "./components/NavBar";

function App() {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.airtable.com/v0/app2eNQJ81li2YSvR/Table%201?api_key=keyzdwwm63fQxCJIq"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.records);
        console.log(res.records);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="row" style={{ marginBottom: "30px" }}>
            {data?.map((singleData) => (
              <div className="col-md-3 mb-5">
                <div
                  className="card h-100 "
                  style={{ minHeight: "300px", cursor: "pointer" }}
                >
                  <img
                    className="card-img-top border-bottom"
                    src={
                      singleData.fields.Attachments?.[0].thumbnails.large.url
                        ? singleData.fields.Attachments?.[0].thumbnails.large
                            .url
                        : "https://via.placeholder.com/362x200"
                    }
                    height="230px"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{singleData.fields.Name}</h5>
                    <p className="card-text">{singleData.fields.emaill}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {singleData.fields.fieldd}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <NewForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
