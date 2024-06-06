import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/Login" || location.pathname === "/Signup";

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
      />
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
