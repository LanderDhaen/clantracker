import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";

import PerformancePage from "./pages/performances/PerformancePage";
import Home from "./components/Home";
import AccountFormPage from "./pages/accountform/AccountFormPage";
import ClanPage from "./pages/clans/ClanPage";
import ClanProfilePage from "./pages/clanprofile/ClanProfilePage";
import AccountPage from "./pages/accounts/AccountPage";
import AccountProfilePage from "./pages/accountprofile/AccountProfilePage";
import { useSessionUser } from "./hooks/useSessionUser";
import LoginFormPage from "./pages/loginform/LoginFormPage";

const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/accounts", element: <AccountPage /> },
      { path: "/accounts/:id", element: <AccountProfilePage /> },
      { path: "/accounts/:id/edit", element: <AccountFormPage /> },
      { path: "/accounts/add", element: <AccountFormPage /> },
      { path: "/performances", element: <PerformancePage /> },
      { path: "/clans", element: <ClanPage /> },
      { path: "/clans/:id", element: <ClanProfilePage /> },
    ],
  },
]);

const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <LoginFormPage /> },
      { path: "/accounts", element: <AccountPage /> },
      { path: "/accounts/:id", element: <AccountProfilePage /> },
      { path: "/performances", element: <PerformancePage /> },
      { path: "/clans", element: <ClanPage /> },
      { path: "/clans/:id", element: <ClanProfilePage /> },
    ],
  },
]);

const App = () => {
  const { data } = useSessionUser();

  const router = data ? privateRouter : publicRouter;

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
