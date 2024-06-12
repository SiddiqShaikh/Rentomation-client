import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/about"  />
        <Route path="/contact" /> */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
