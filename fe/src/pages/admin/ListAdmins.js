import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAdmins, deleteAdmin } from "../../axios/adminAxios";

const ListAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAdmins((result) => setAdmins(result));
  }, []);

  const deleteHandler = (id) => {
    deleteAdmin(id);
  };

  return (
    <>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <div className="float">
              <Link to="/admins/register" className="btn btn-sm btn-primary">
                Add Admin
              </Link>
              <hr />
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map((admin) => {
                    const { id, name, email } = admin;
                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>
                          <Link
                            to={`/admins/account/${id}`}
                            className="btn btn-sm me-2 btn-dark"
                          >
                            Detail
                          </Link>
                          <Link
                            to={`/admins/${id}`}
                            className="btn btn-sm btn-info"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteHandler(+id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <p>Loading...</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAdmins;
