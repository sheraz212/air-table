import React from "react";

function NewForm() {
  return (
    <div
      className="row mb-5 p-4 justify-content-evenly rounded-5"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        className="d-flex col-md-6 mx-3 justify-content-center align-content-center flex-column"
        style={{
          backgroundImage:
            'url("https://www.thoughtfarmer.com/wp-content/uploads/2019/09/image.png")',
        }}
      ></div>
      <div className="card p-3 col-md-5 py-5">
        <h2 className="text-center">Contact Us</h2>
        <form>
          <div className="form-group  mb-2">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group  mb-2">
            <label for="exampleInputPassword1">Name</label>
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="form-group  mb-2">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Send the Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewForm;
