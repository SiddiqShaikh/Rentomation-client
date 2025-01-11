import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginModal from "../../hooks/loginModal";
import useUserStatus from "../../hooks/userStatus";
import { NavbarProps } from "../../types/commonInterface";
import apiCall from "../../utils/api";
import Button from "../Button";
import Container from "../Container";
import Logo from "../Logo";
import { Link } from "react-scroll";

import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    apiCall("user/profile", "GET", null, null, headers)
      .then(() => {
        userStatus.setUser();
      })
      .catch((err) => {
        userStatus.clearUser();
        console.error(err);
      });
  }, [token]);

  const navigate = useNavigate();

  return (
    <div
      className={`w-full fixed z-[3] text-white top-0 shadow-md transition-all ease-in-out duration-300  ${
        isScrolled ? "bg-black/80" : "backdrop-blur-md bg-black/20"
      }`}
    >
      <Container>
        <div className="flex items-center py-4">
          <div className="flex-1 md:flex-[0.6]">
            <Logo onClick={() => navigate("/")} />
          </div>
          <div className="flex-1 items-center gap-2 md:gap-6 md:flex hidden">
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer hover:text-neutral-400"
              onClick={() => navigate("/")}
            >
              Home
            </Link>
            <Link
              to="rentomation"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer hover:text-neutral-400"
            >
              Rentomation
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer hover:text-neutral-400"
            >
              About
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer hover:text-neutral-400"
            >
              Contact
            </Link>
          </div>
          <div className="hidden md:flex">
            {!userStatus.isLoggedIn ? (
              <Button
                label="Login / Register"
                className="text-white max-w-[200px] py-2"
                onClick={() => loginModal.onOpen()}
              />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CircleUserRound />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/property/myproperty")}
                  >
                    Rentomation my home
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/property/manage-booking")}
                  >
                    Manage Booking
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                      onClick={() => navigate("/property/myproperty")}
                    >
                      My Home
                    </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("auth-token");
                      userStatus.clearUser();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className="flex md:hidden">
            {/* User Menu (Mobile) */}
            <UserMenu />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
