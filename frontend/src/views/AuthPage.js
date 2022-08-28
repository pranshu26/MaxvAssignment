import React, { Component } from "react";
import Login from "../components/Login";
import Register from "../components/register";

export default class Auth extends Component {
  render() {
    const params = useParams();
    return params.isLogin ? <Login /> : <Register />;
  }
}
