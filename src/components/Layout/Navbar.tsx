import { useState } from "react";
import { NavbarProps } from "../../types/commonInterface";
import Button from "../Button";
import Container from "../Container";
import Modal from "../Dialogs/loginModal";
import Logo from "../Logo";
import UserMenu from "./Usermenu";

const Navbar: React.FC<NavbarProps> = () => {
  const [openLoginForm, setOpenLoginForm] = useState<boolean>(false);
  return (
    <div className="w-full bg-black text-white">
      <Modal open={openLoginForm} setOpen={setOpenLoginForm} />
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
            <Button
              label="Login/Register"
              className="text-white max-w-[200px]"
              onClick={() => setOpenLoginForm(true)}
            />
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
