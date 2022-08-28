import axios from "axios";
import { BASE_URL } from "./config";

const UserService = {
  isLoggedIn: () => !!localStorage.getItem("x-token"),
  getAuthHeaders: () => {
    return {
      "x-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicHJhbnNodS4wMEBzODEuY29tIiwiY3JlYXRlZEF0IjoiMjAyMi0wOC0yN1QyMToxMDoxNS42MTRaIn0sImlhdCI6MTY2MTYzNDYxNX0.8lKDxNa9U4Drp-Mj-3RzLmFMJvCcNIyb-TjBtfBhomg",
    };
  },
  login: (email, password) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/pub/login`,
      data: {
        email,
        password,
      },
    }).then((res) => res.data);
  },
  register: (email, password, website, companyName) => {
    console.log({
      email,
      password,
      companyWebsite: website,
      companyName,
    });
    return axios({
      method: "POST",
      url: `${BASE_URL}/pub/register`,
      data: {
        email,
        password,
        companyWebsite: website,
        companyName,
      },
    }).then((res) => res.data);
  },
};

export default UserService;
