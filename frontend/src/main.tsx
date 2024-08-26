import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Root = lazy(() => import("./components/Root"));
const PerformancePage = lazy(
  () => import("./pages/performances/PerformancePage")
);
const Home = lazy(() => import("./pages/home/HomePage"));
const AccountFormPage = lazy(
  () => import("./pages/accountform/AccountFormPage")
);
const ClanPage = lazy(() => import("./pages/clans/ClanPage"));
const ClanProfilePage = lazy(
  () => import("./pages/clanprofile/ClanProfilePage")
);
const AccountPage = lazy(() => import("./pages/accounts/AccountPage"));
const AccountProfilePage = lazy(
  () => import("./pages/accountprofile/AccountProfilePage")
);
const LoginFormPage = lazy(() => import("./pages/loginform/LoginFormPage"));
const NotFoundPage = lazy(() => import("./components/NotFound"));

const CWLPage = lazy(() => import("./pages/cwls/CWLPage"));

import { useSessionUser } from "./hooks/useSessionUser";
import Loader from "./components/Loader";

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
      { path: "/cwls", element: <CWLPage /> },
      { path: "*", element: <NotFoundPage /> },
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
      { path: "/cwls", element: <CWLPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const App = () => {
  const { data } = useSessionUser();

  const router = data ? privateRouter : publicRouter;

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
