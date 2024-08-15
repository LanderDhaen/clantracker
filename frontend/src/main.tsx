import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root";

import MemberPage from "./pages/members/MemberPage";
import PerformancePage from "./pages/performance/PerformancePage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Home from "./components/Home.jsx";
import MemberFormPage from "./pages/memberform/MemberFormPage";
import ClanPage from "./pages/clans/ClanPage";
import ClanProfilePage from "./pages/clanprofile/ClanProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/members", element: <MemberPage /> },
      { path: "/members/:id", element: <ProfilePage /> },
      { path: "/members/:id/edit", element: <MemberFormPage /> },
      { path: "/members/add", element: <MemberFormPage /> },
      { path: "/performance", element: <PerformancePage /> },
      { path: "/clans", element: <ClanPage /> },
      { path: "/clans/:id", element: <ClanProfilePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
