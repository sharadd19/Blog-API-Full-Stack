import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";

import ErrorPage from "./ErrorPage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import SignUp from "./components/SignUp/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
