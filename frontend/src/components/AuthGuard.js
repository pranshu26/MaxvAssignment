import { Navigate, useLocation } from "react-router-dom";
import UserService from "../services/UserService";

const AuthGuard = ({ children }) => {
  let isAuthenticated = UserService.isLoggedIn();

  return (
    <>{isAuthenticated ? children : <Navigate replace to="/auth/login" />}</>
  );
};

export default AuthGuard;
