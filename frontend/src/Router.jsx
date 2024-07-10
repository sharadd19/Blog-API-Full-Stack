
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
// import Store, {loader as storeLoader} from "./components/Store/Store"
// import Home from "./components/HomePage/Home";
import ErrorPage from "./ErrorPage";
// import Bag from "./components/Bag/Bag";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>{
      <Route path="/" element={<App/>} errorElement={<ErrorPage />}>
        {/* <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route loader={storeLoader} path="/" element={<Store />}/>
          <Route path="/post" element={<Post/>}/>
        </Route> */}
      </Route>}
    </>
  )
);


export default router;
