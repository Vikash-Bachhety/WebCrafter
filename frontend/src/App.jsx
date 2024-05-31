import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
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
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
