import React from "react";

function SignupPage() {
  return (
    <section>
      <div class="container h-100 mt-3">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-9">
            <div class="card" style={{ borderRadius: "15px" }}>
              <div class="card-body">
                <h3 className="mt-3 text-center">
                  Sign Up to get Exclusive Access
                </h3>
                <div class="row align-items-center pt-4 pb-3">
                  <div class="col-md-3 ps-5">
                    <h6 class="mb-0">Full name</h6>
                  </div>
                  <div class="col-md-9 pe-5">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Enter name here."
                    />
                  </div>
                </div>

                <div class="row align-items-center py-3">
                  <div class="col-md-3 ps-5">
                    <h6 class="mb-0">Email address</h6>
                  </div>
                  <div class="col-md-9 pe-5">
                    <input
                      type="email"
                      class="form-control form-control-lg"
                      placeholder="example@example.com"
                    />
                  </div>
                </div>

                <div class="row align-items-center py-3">
                  <div class="col-md-3 ps-5">
                    <h6 class="mb-0">Password</h6>
                  </div>
                  <div class="col-md-9 pe-5">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      placeholder=""
                    />
                  </div>
                </div>

                <div class="d-flex px-5 py-4 justify-content-center align-items-center">
                  <button type="submit" class="btn btn-primary btn-lg">
                    Initiate Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
