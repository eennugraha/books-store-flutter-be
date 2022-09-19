import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  const { loginCbHandler } = props;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: `http://localhost:3000/api/admins/login`,
        data: form,
      });
      const access_token = result.data.access_token;
      localStorage.setItem("access_token", access_token);
      loginCbHandler(true);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const submitHandler = () => {
    loginUser();
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Welcome</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your email and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        type="text"
                        className="form-control"
                        placeholder="Email here..."
                      />
                      <label className="form-label">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        type="PASSWORD"
                        className="form-control"
                        placeholder="Password here..."
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <button
                      onClick={() => submitHandler()}
                      className="btn btn-sm btn-success"
                    >
                      LOGIN
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  {/* <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="#!" className="text-white-50 fw-bold">
                        Register
                      </a>
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
