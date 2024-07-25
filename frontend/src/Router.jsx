import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";

import ErrorPage from "./ErrorPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import loginAction from "./actions/loginAction";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<App />}
        errorElement={<ErrorPage />}
      />
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
