import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}
