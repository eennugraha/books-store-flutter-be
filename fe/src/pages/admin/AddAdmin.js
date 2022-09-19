import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { register } from "../../axios/adminAxios";

const AddAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: {},
  });

  const navigation = useNavigate();
  const params = useParams();
  const { id } = params;

  const submitHandler = () => {
    register(form, localStorage.access_token);
    navigation("/admins");
    console.log(form);
  };

  return (
    <>
      <div className="row my-3">
        <div className="w-100 text-center">
          <hr />
          <p>Add Admin</p>
        </div>
        <div className="w-50 mx-auto">
          <div className="mb-3">
            <label>Name: </label>
            <input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label>Email: </label>
            <input
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label>Password: </label>
            <input
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="text"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label>Image: </label>
            <input
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              type="file"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <button
              onClick={() => submitHandler()}
              className="btn btn-block btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
