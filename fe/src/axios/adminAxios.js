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

const register = async (admin) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL + "/register",
      data: admin,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // Swal.fire("Add author", "Author has been added", "success");
    console.log(admin);
  } catch (err) {
    console.log(err);
  }
};

// const edit = async (id, data, img) => {
//   try {

//   } catch (err) {
//     console.log(err)
//   }
// }

export { getAdmins, detailAdmin, register };
