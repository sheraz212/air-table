import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import NewForm from "./components/NewForm";

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
    <div className="container mt-5">
      <div>
        <h1>Upload and Display Image usign React Hook's</h1>
        {selectedImage && (
          <div>
            <img
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />

        <br />
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      <div className="row">
        <div className="row" style={{ marginBottom: "30px" }}>
          {data?.map((singleData) => (
            <div className="col-md-3">
              <div
                className="card "
                style={{ minHeight: "300px", marginTop: "40px" }}
              >
                <img
                  className="card-img-top"
                  src="https://via.placeholder.com/362x200"
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
  );
}

export default App;
