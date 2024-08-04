import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Property from "./pages/property";
import LoginModal from "./components/Dialogs/loginModal";
import RegisterModal from "./components/Dialogs/registerModal";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <LoginModal />
        <RegisterModal />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/property/:id" Component={Property} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/about"  />
        <Route path="/contact" /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
