import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}
