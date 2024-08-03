import { useEffect, useState } from "react";
import { NavbarProps } from "../../types/commonInterface";
import Button from "../Button";
import Container from "../Container";

import useLoginModal from "../../hooks/loginModal";
import apiCall from "../../utils/api";
import Logo from "../Logo";
import UserMenu from "./Usermenu";
import useUserStatus from "../../hooks/userStatus";

const Navbar: React.FC<NavbarProps> = () => {
  const loginModal = useLoginModal();
  const userStatus = useUserStatus();
  const token = localStorage.getItem("auth-token");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const headers = {
    "x-auth-token": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
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
    <div className="w-full bg-black text-white">
      <Container>
        <div className="flex items-center py-4">
          <div className="flex-1 md:flex-[0.6]">
            <Logo />
          </div>
          <div className="flex-1 items-center gap-2 md:gap-6 md:flex hidden">
            <div className="cursor-pointer hover:text-btnPrimary">Home</div>
            <div className="cursor-pointer hover:text-btnPrimary">
              Rentomation
            </div>
            <div className="cursor-pointer hover:text-btnPrimary">About</div>
            <div className="cursor-pointer hover:text-btnPrimary">Contact</div>
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
                <div className="cursor-pointer hover:underline hover:text-btnPrimary text-sm ">
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
