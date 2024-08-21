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
import signUpAction from "./actions/signUpAction";
import createOrUpdatePostAction from "./actions/createOrUpdatePostAction";
import ViewPost from "./components/Post/ViewPost";
import PostForm from "./components/Post/PostForm";
import EditPost from "./components/Post/EditPost";
import postFormLoader from "./loaders/postFormLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />} />
      <Route
        path="/signup"
        element={<SignUp />}
        action={signUpAction}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/login"
        element={<Login />}
        action={loginAction}
        errorElement={<ErrorPage />}
      />
      <Route
      path="/post"
      loader={postFormLoader}
      element={<PostForm/>}
      action={createOrUpdatePostAction}
      errorElement={<ErrorPage/>}
      />
      <Route path="/post/:postId" loader={postFormLoader} element={<ViewPost />}/>
        
      <Route path="/post/:postId/edit" loader={postFormLoader} action={createOrUpdatePostAction} element={<PostForm />} />

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
