import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { register, detailAdmin, edit } from "../../axios/adminAxios";

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

  useEffect(() => {
    if (id) {
      detailAdmin(+id, localStorage.access_token, (result) => {
        setForm({
          name: result.name,
          email: result.email,
          password: result.password,
          image: result.image,
        });
      });
    }
  }, []);

  const submitHandler = () => {
    id
      ? edit(id, form, localStorage.access_token)
      : register(form, localStorage.access_token);
    navigation("/admins");
    console.log(form);
  };

  const api_img = "http://localhost:3000/";

  return (
    <>
      <div className="row my-3">
        <div className="w-100 text-center">
          <hr />
          <p>{id ? "Edit Admin" : "Add Admin"}</p>
        </div>
        <div className="w-50 mx-auto">
          {/* {console.log(form.image)} */}
          <div className="mb-3">
            <label>Name: </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label>Email: </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label>{id ? "New/Old Password: " : "Password"}</label>
            <input
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label>Image: </label>
            <input
              // value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              type="file"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label>Current Image</label>
            <div>
              <img
                src={form.image ? api_img + form.image : ""}
                alt="You have selected new image to be uploaded!"
                width={form.image ? "100" : "100"}
                height={form.image ? "100" : "100"}
              />
            </div>
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
