import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { detailAdmin } from "../../axios/adminAxios";

const DetailAdmin = () => {
  const [admin, setAdmin] = useState([]);

  const params = useParams();

  useEffect(() => {
    const { id } = params;
    detailAdmin(+id, (result) => setAdmin(result));
  }, []);

  const displayImage = "http://localhost:3000/" + admin.image;

  return (
    <>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Photo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <img
                      src={displayImage}
                      alt=""
                      width={100}
                      height={100}
                    ></img>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailAdmin;
