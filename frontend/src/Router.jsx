import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
} from "react-router-dom";
import App from "./App";

import ErrorPage from "./ErrorPage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import SignUp from "./components/SignUp/SignUp";
import loginAction from "./actions/loginAction";
import homeLoader from "./loaders/homeLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<App />}
        loader={homeLoader}
        errorElement={<ErrorPage />}
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/login"
        element={<Login />}
        action={loginAction}
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
