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
import PerformancePage from "./pages/performance/PerformancePage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/members", element: <MemberPage /> },
      { path: "/members/:id", element: <ProfilePage /> },
      { path: "/performance", element: <PerformancePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
