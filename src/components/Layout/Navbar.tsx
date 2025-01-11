/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginModal from "../../hooks/loginModal";
import useUserStatus from "../../hooks/userStatus";
import { NavbarProps } from "../../types/commonInterface";
import apiCall from "../../utils/api";
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
import { Button } from "antd";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  complaintText: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const loginModal = useLoginModal();
  const userStatus = useUserStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("auth-token");
  const headers = {
    "x-auth-token": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      complaintText: "",
    },
  });

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await apiCall("complain", "POST", data);
      setLoading(false);
      toast.success("Complain added successfully");
      loginModal.onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      reset();
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Complain</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 w-full"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="complaintText"
                className="block text-gray-700 font-medium mb-2"
              >
                Complaint
              </label>
              <textarea
                id="complaintText"
                {...register("complaintText", {
                  required: "Complaint is required",
                })}
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.complaintText ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  errors.complaintText
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                placeholder="Enter your complaint"
                rows={4}
              ></textarea>
              {errors.complaintText && (
                <span className="text-red-500 text-sm">
                  {errors.complaintText.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>

          <DialogFooter>
            {/* <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button> */}
            {/* <Button onClick={handleBookingConfirm}>Confirm Booking</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

            <Button
              danger
              type="primary"
              size="middle"
              className="mx-3"
              onClick={() => setIsModalOpen(true)}
            >
              Add Complain
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
