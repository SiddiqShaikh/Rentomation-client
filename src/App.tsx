import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MyProfile from "./pages/property/MyProfile";
import RentomationMyHome from "./pages/property/RentomationMyHome";
import Properties from "./pages/property";

import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";

import RegisterModal from "./components/Dialogs/registerModal";
import LoginModal from "./components/Dialogs/loginModal";
import RentModal from "./components/Dialogs/RentModal";

import "./App.css";
import PropertyDetail from "./pages/property/propertyDetail";
import DeleteModal from "./components/Dialogs/deleteModel";
import Message from "./pages/Message";
import ManageBooking from "./pages/property/ManageBooking";
import { useState } from "react";

function App() {
  const [isAddProperty, setIsAddProperty] = useState(false);
  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <LoginModal />
        <RegisterModal />
        <DeleteModal />
        <RentModal setIsAddProperty={setIsAddProperty} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/property/all" Component={Properties} />
          <Route path="/profile" Component={MyProfile} />
          <Route
            path="/property/myproperty"
            element={
              <RentomationMyHome
                isAddProperty={isAddProperty}
                setIsAddProperty={setIsAddProperty}
              />
            }
          />
          <Route path="/property/detail" Component={PropertyDetail} />
          <Route path="/property/manage-booking" Component={ManageBooking} />
          <Route path="/messages" Component={Message} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/about"  />
        <Route path="/contact" /> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
