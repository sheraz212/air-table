import React from "react";

function NewForm() {
  return (
    <div class="card p-3 mt-4">
      <h4 className="text-center pb-4">Add New Record</h4>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Name</label>
          <input type="text" class="form-control" placeholder="Name" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
          Add New Record
        </button>
      </form>
    </div>
  );
}

export default NewForm;
