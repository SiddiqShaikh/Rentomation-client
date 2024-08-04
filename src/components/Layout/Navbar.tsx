import { useEffect, useState } from "react";
import { NavbarProps } from "../../types/commonInterface";
import Button from "../Button";
import Container from "../Container";

import useLoginModal from "../../hooks/loginModal";
import useUserStatus from "../../hooks/userStatus";
import apiCall from "../../utils/api";
import Logo from "../Logo";
import UserMenu from "./Usermenu";

const Navbar: React.FC<NavbarProps> = () => {
  const loginModal = useLoginModal();
  const userStatus = useUserStatus();
  const token = localStorage.getItem("auth-token");
  const headers = {
    "x-auth-token": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) { // Adjust the scroll threshold as needed
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
   
    apiCall("user/profile", "GET", null, null, headers)
      .then((response) => {
        console.log("user profile", response);
        userStatus.setUser();
      })
      .catch((err) => {
        console.log(err);
        userStatus.clearUser();
      });
  }, [token]);
  return (
    <div className={`w-full fixed z-[3] text-white shadow-md transition-all ease-in-out duration-300 ${isScrolled ? 'bg-black bg-opacity-20' : 'bg-transparent'}`}>
      <Container>
        <div className="flex items-center py-4">
          <div className="flex-1 md:flex-[0.6]">
            <Logo />
          </div>
          <div className="flex-1 items-center gap-2 md:gap-6 md:flex hidden">
            <div className="cursor-pointer hover:text-[#F4511E]">Home</div>
            <div className="cursor-pointer hover:text-[#F4511E]">
              Rentomation
            </div>
            <div className="cursor-pointer hover:text-[#F4511E]">About</div>
            <div className="cursor-pointer hover:text-[#F4511E]">Contact</div>
          </div>
          <div className="hidden md:flex">
            {!userStatus.isLoggedIn ? (
              <Button
                label="Login/Register"
                className="text-white max-w-[200px]"
                onClick={() => loginModal.onOpen()}
              />
            ) : (
              <div className="w-full flex gap-2 items-center">
                <div className="cursor-pointer hover:underline hover:text-[#F4511E] text-sm ">
                  My Properties
                </div>
                <Button
                  label="Logout"
                  className="text-white max-w-[200px] flex-1"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    userStatus.clearUser()
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex md:hidden">
            <UserMenu />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
