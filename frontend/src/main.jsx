import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root.jsx";

import MemberPage from "./pages/members/MemberPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "/members", element: <MemberPage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
