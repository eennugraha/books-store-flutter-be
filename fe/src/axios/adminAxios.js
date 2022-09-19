import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3000/api/admins";

const getAdmins = async (cb) => {
  try {
    let admins = await axios({
      method: "GET",
      url: URL,
    });
    cb(admins.data);
  } catch (err) {
    console.log(err);
  }
};

const detailAdmin = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/account/" + id,
    });
    cb(result.data);
  } catch (err) {
    console.log(err);
  }
};

const register = async (admin, access_token) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL + "/register",
      data: admin,
      headers: {
        "content-type": "multipart/form-data",
        auth: access_token,
      },
    });
    Swal.fire("Add admin", "admin has been added", "success");
  } catch (err) {
    console.log(admin.image);
    if (err.message === "Request failed with status code 500") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email address already exists! You may login instead",
      });
    }
  }
};

const edit = async (id, data, access_token) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "/" + id,
      data: data,
      headers: {
        "content-type": "multipart/form-data",
        auth: access_token,
      },
    });
    console.log(result.data);
    if (result.data === `Admin with id ${id} has been updated!`) {
      Swal.fire(
        "Edit Item",
        "Item " +
          data.email +
          " has been updated! Refresh the page to see changes!",
        "success"
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fail to update Item",
      });
    }
    // console.log(result.data.message);
  } catch (err) {
    console.log(err);
  }
};

const deleteAdmin = async (id) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await axios({
          method: "DELETE",
          url: URL + "/" + id,
        });
        console.log(result.data);
        if (result.data === `Admin with id: ${id} has been deleted!`) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fail to delete Item",
          });
        }
        // window.location.reload();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export { getAdmins, detailAdmin, register, deleteAdmin, edit };
