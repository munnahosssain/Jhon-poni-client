import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Shop from "../src/Pages/Shop/Shop";
import Home from "./Pages/Home/Home";
import Order from "./Pages/Order/Order";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Checkout from "./Pages/Checkout/Checkout";
import Inventory from "./Pages/Inventory/Inventory";
import AuthProvider from "./Pages/Providers/AuthProvider";
import cartProductsLoader from "../public/loader/cartProductsLoader";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./Routes/privateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Shop />,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "/orders",
        element: <Order />,
        loader: cartProductsLoader,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
