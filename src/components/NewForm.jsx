import axios from "axios";
import React from "react";
import { useState } from "react";
import { APIKEY_AIRTABLE, CONTACT_FORM_SUBMISSION } from "../Constants/APIKeys";
import { checkValidMail } from "./CustomHooks/CheckEmailValidation";

function NewForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const submitForm = async () => {
    const { name, email, description } = formData;
    if ((!name, !email, !description)) {
      alert("Please fill all fields");
      return;
    }
    if (!checkValidMail(email)) {
      alert("Please enter valid email");
      return;
    }
    let data = {
      fields: {
        "Email Address": email,
        Name: name,
        Description: description,
      },
    };
    const response = await axios.post(
      CONTACT_FORM_SUBMISSION,
      JSON.stringify(data),
      {
        headers: {
          Authorization: APIKEY_AIRTABLE,
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.data?.id) {
      setFormSubmitted(true);
      console.log(response);
    } else alert("Something went wrong please try again on previous page");
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="row mb-5 justify-content-evenly"
      style={{ flexDirection: "row", minHeight: "500px", fontWeight: "bold" }}
    >
      <div
        className="col-md-6 "
        style={{
          backgroundImage:
            'url("https://www.thoughtfarmer.com/wp-content/uploads/2019/09/image.png")',
        }}
      />
      <div
        className="card p-3 col-md-5 py-5 "
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <h2 className="text-center">Contact Us</h2>
        <form>
          {!formSubmitted ? (
            <>
              <div className="form-group  mb-2">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={onChangeHandler}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone.
                </small>
              </div>
              <div className="form-group  mb-2">
                <label for="exampleInputPassword1">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group  mb-2">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  onChange={onChangeHandler}
                  rows="3"
                  placeholder="Write your question, suggestion here.."
                />
              </div>

              <div
                // type="submit"
                onClick={submitForm}
                className="btn btn-primary mt-3"
              >
                Send the Message
              </div>
            </>
          ) : (
            <div
              className="text-success m-5"
              style={{ minHeight: "200px", fontWeight: "bold" }}
            >
              "Your form has been submitted successfully. We will get back to
              you shortly. Thank you."
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewForm;
